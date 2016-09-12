package com.triptracker.tracker;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.PowerManager;
import android.support.v4.content.WakefulBroadcastReceiver;
import android.widget.Toast;

import java.util.Calendar;

/**
 * Created by ubuntu on 12.08.2016.
 */
public class MyScheduleReceiver extends WakefulBroadcastReceiver {

    PowerManager.WakeLock wakeLock;

    private Handler handler = new Handler();
    private Runnable runnableCode;

    @Override
    public void onReceive(Context context, Intent intent) {
        Bundle bundle = intent.getExtras();
        if (bundle != null) {
            String broadcastType = bundle.getString(Constants.BROADCAST_TYPE);
            if (broadcastType != null) {
                switch (broadcastType) {
                    case Constants.BROADCAST_START :
                        onReceiveStart(context);
                        break;
                    case Constants.BROADCAST_STOP:
                        onReceiveStop(context);
                        break;
                }
            }
        }
    }

    public AlarmManager getAlarmManager(Context context) {
        return (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
    }

    public PendingIntent getPendingIntent(Context context) {
        Intent i = new Intent(context, LocationService.class);
        PendingIntent pending = PendingIntent.getService(context, 0, i, 0);
        return pending;
    }

    public void onReceiveStart(final Context context) {
        Toast.makeText(context, "On receive BroadcastReceiver", Toast.LENGTH_SHORT).show();

        PowerManager powerManager = (PowerManager)context.getSystemService(Context.POWER_SERVICE);
        wakeLock = powerManager.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "TrackerWakeLock");
        wakeLock.acquire();
//        AlarmManager alarmManager = getAlarmManager(context);
//        PendingIntent pending = getPendingIntent(context);
//
//        Calendar cal = Calendar.getInstance();
//
//        alarmManager.setRepeating(AlarmManager.RTC_WAKEUP,
//                cal.getTimeInMillis() + (2 * 1000), Constants.REPEAT_TIME, pending);

        runnableCode = new Runnable() {
            @Override
            public void run() {
                Intent i = new Intent(context,LocationService.class);
                context.startService(i);
                handler.postDelayed(this, Constants.REPEAT_TIME);
            }
        };

        handler.post(runnableCode);
    }

    public void onReceiveStop(Context context) {
        AlarmManager alarmManager = getAlarmManager(context);
        PendingIntent pending = getPendingIntent(context);

        handler.removeCallbacks(runnableCode);
        wakeLock.release();
        Toast.makeText(context, "Stopping repeat", Toast.LENGTH_SHORT).show();

        alarmManager.cancel(pending);
    }


}
