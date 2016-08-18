package com.triptracker.tracker.json;


import com.triptracker.tracker.Constants;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.TimeZone;

public class LocationUpdate {
    private Double mLatitude;
    private Double mLongitude;
    private String mTime;
    private String mUsername;

    public LocationUpdate(double lat, double lng, String username) {
        mLatitude = lat;
        mLongitude = lng;
        mTime = Constants.getCurrentTime();
        mUsername = username;
    }

    public Map<String, String> mapProperties() {
        Map<String, String> map = new HashMap<>();

        map.put(Constants.LOCATION_UPDATE_LATITUDE, mLatitude.toString());
        map.put(Constants.LOCATION_UPDATE_LONGITUDE, mLongitude.toString());
        map.put(Constants.LOCATION_UPDATE_TIME, mTime);
        map.put(Constants.LOCATION_UPDATE_USERNAME, mUsername);

        return map;
    }

}
