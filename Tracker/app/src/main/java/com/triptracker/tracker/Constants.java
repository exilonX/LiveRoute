package com.triptracker.tracker;

import android.location.Location;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

/**
 * Created by ubuntu on 12.08.2016.
 */
public class Constants {
    public static final String BROADCAST = "test.service.android.action.broadcast";

    public static final String BROADCAST_TYPE = "BroadcastType";
    public static final String BROADCAST_START = "BroadcastStartService";
    public static final String BROADCAST_STOP = "BroadcastStopService";
    public static final int LOCATION_INTERVAL = 1000;
    public static final float LOCATION_DISTANCE = 10f;
    public static final long REPEAT_TIME = 1000 * 10;

    public static final String ISO_DATE_FORMAT = "yyyy-MM-dd'T'HH:mm'Z'";



    public static final String LOCATION_UPDATE_LATITUDE = "lat";
    public static final String LOCATION_UPDATE_LONGITUDE = "long";
    public static final String LOCATION_UPDATE_TIME = "time";
    public static final String LOCATION_UPDATE_USERNAME = "username";

    public static final int TIME_ACCURACY = 1000 * 30;

    public static final String WAKELOCK_TAG = "TrackerWakeLock";

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


    public static String getCurrentTime() {
        TimeZone tz = TimeZone.getDefault();
        DateFormat df = new SimpleDateFormat(ISO_DATE_FORMAT);
        df.setTimeZone(tz);
        return df.format(new Date());
    }
}
