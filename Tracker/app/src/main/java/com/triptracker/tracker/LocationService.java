package com.triptracker.tracker;


import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.IBinder;
import android.os.Looper;
import android.os.Message;
import android.os.Process;
import android.support.annotation.Nullable;
import android.util.Log;
import android.widget.Toast;

import com.triptracker.tracker.json.LocationUpdate;

import java.util.ArrayList;


public class LocationService extends Service {

    private Looper mServiceLooper;
    private ServiceHandler mServiceHandler;
    private LocationListener[] mLocationListeners = new LocationListener[]{
            new LocationListener(LocationManager.GPS_PROVIDER),
            new LocationListener(LocationManager.NETWORK_PROVIDER)
    };
    private LocationManager mLocationManager;
    private static final String TAG = "LocationService";
    private boolean locationSent = false;
    private ArrayList<Location> mLocationArray = new ArrayList<>();

    // Service handler
    private final class ServiceHandler extends Handler {
        private Context ctx;

        public ServiceHandler(Looper looper, Context ctx) {
            super(looper);
            this.ctx = ctx;
        }

        private void requestLocationUpdate(String provider, LocationListener listener) {
            try {
                mLocationManager.requestLocationUpdates(
                        provider, Constants.LOCATION_INTERVAL, Constants.LOCATION_DISTANCE, listener
                );
            } catch (SecurityException ex) {
                Log.d(TAG, "provider does not exist" + provider + ex.getMessage());
            } catch (IllegalArgumentException ex) {
                Log.d(TAG, "provider does not exist" + provider +  ex.getMessage());
            }
        }

        @Override
        public void handleMessage(Message msg) {
            Toast.makeText(ctx, "In handle message should get location", Toast.LENGTH_SHORT).show();

            // request location update network
            requestLocationUpdate(LocationManager.NETWORK_PROVIDER, mLocationListeners[1]);

            // request location update GPS
            requestLocationUpdate(LocationManager.GPS_PROVIDER, mLocationListeners[0]);

            // Stop the service using the startId, so that we don't stop
            // the service in the middle of handling another job
            stopSelf(msg.arg1);
        }
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Message msg = mServiceHandler.obtainMessage();
        msg.arg1 = startId;
        mServiceHandler.sendMessage(msg);

        return START_STICKY;
    }

    @Override
    public void onCreate() {
        HandlerThread thread = new HandlerThread("ServiceStartArguments", Process.THREAD_PRIORITY_BACKGROUND);
        thread.start();

        Log.d("SERVICE", "Inainte de start serviciu");
        mServiceLooper = thread.getLooper();
        mServiceHandler = new ServiceHandler(mServiceLooper, this);

        // init location manager to get the location
        initializeLocationManager();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }

    // ======== Location

    // location listener
    private class LocationListener implements android.location.LocationListener {

        private Location mLastLocation;
        private static final String TAG = "LOCATION_LISTENER";
        private String provider;

        public LocationListener(String provider) {
            this.provider = provider;
            mLastLocation = new Location(provider);
        }

        /**
         * Get the best location from two providers - network and gps
         * @param location1
         * @param location2
         * @return the best location based on time and accuracy
         */
        public Location bestLocation(Location location1, Location location2) {
            if (location1 == null)
                return location2;
            if (location2 == null)
                return location1;

            long deltaTime = location1.getTime() - location2.getTime();
            int deltaAccuracy = (int)(location1.getAccuracy() - location2.getAccuracy());

            if (Math.abs(deltaTime) > Constants.TIME_ACCURACY) {
                if (deltaTime > 0) {
                    return location1;
                } else {
                    return location2;
                }
            } else {
                if (deltaAccuracy > 0) {
                    return location1;
                } else {
                    return location2;
                }
            }
        }

        @Override
        public void onLocationChanged(Location location) {
            Toast.makeText(getApplicationContext(), "Location " + location.toString(), Toast.LENGTH_SHORT).show();
            mLastLocation.set(location);
            if (mLocationArray.size() > 1) {
                Toast.makeText(getApplicationContext(), "Location array size > 1 ", Toast.LENGTH_SHORT).show();
                Location bestLocation = bestLocation(mLocationArray.get(0), location);

                // Create the location update object
                LocationUpdate locationUpdate = new LocationUpdate
                        (bestLocation.getLatitude(), bestLocation.getLongitude(), "user1");

                // When the location changes I this is triggered
                LocationUpdateSender locationSender = new LocationUpdateSender(getApplicationContext());
                locationSender.locationUpdate(locationUpdate);

            } else {
                mLocationArray.add(location);
            }
        }

        @Override
        public void onStatusChanged(String s, int i, Bundle bundle) {
            Log.d(TAG, "onStatus changed");
        }

        @Override
        public void onProviderEnabled(String s) {
            Log.d(TAG, "onProvider enabled");

        }

        @Override
        public void onProviderDisabled(String s) {
            Log.d(TAG, "on Provider disabled");
        }
    }

    private void initializeLocationManager() {
        if (mLocationManager == null)
            mLocationManager = (LocationManager) getApplicationContext().getSystemService(Context.LOCATION_SERVICE);
    }
}
