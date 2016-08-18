package com.triptracker.tracker;

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
    public static final long REPEAT_TIME = 1000 * 30;

    public static final String ISO_DATE_FORMAT = "yyyy-MM-dd'T'HH:mm'Z'";

    public static String getCurrentTime() {
        TimeZone tz = TimeZone.getDefault();
        DateFormat df = new SimpleDateFormat(ISO_DATE_FORMAT);
        df.setTimeZone(tz);
        return df.format(new Date());
    }

    public static final String LOCATION_UPDATE_LATITUDE = "lat";
    public static final String LOCATION_UPDATE_LONGITUDE = "long";
    public static final String LOCATION_UPDATE_TIME = "time";
    public static final String LOCATION_UPDATE_USERNAME = "username";

    public static final int TIME_ACCURACY = 1000 * 30;


}
