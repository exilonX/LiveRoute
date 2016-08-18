package com.triptracker.tracker;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import java.util.Calendar;

/**
 * Created by ubuntu on 12.08.2016.
 */
public class MyScheduleReceiver extends BroadcastReceiver {

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

    public void onReceiveStart(Context context) {
        Toast.makeText(context, "On receive BroadcastReceiver", Toast.LENGTH_SHORT).show();

        AlarmManager alarmManager = getAlarmManager(context);
        PendingIntent pending = getPendingIntent(context);

        Calendar cal = Calendar.getInstance();

        alarmManager.setInexactRepeating(AlarmManager.RTC_WAKEUP,
                cal.getTimeInMillis(), Constants.REPEAT_TIME, pending);
    }

    public void onReceiveStop(Context context) {
        AlarmManager alarmManager = getAlarmManager(context);
        PendingIntent pending = getPendingIntent(context);

        Toast.makeText(context, "Stopping repeat", Toast.LENGTH_SHORT).show();

        alarmManager.cancel(pending);
    }


}
