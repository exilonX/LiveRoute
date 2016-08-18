package com.triptracker.tracker;

import android.content.Context;
import android.util.Log;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.triptracker.tracker.json.LocationUpdate;

import org.json.JSONObject;


public class LocationUpdateSender {

    private Context context;
    private RequestQueue queue;
    private static final String TAG = "LocationUpdater";

    LocationUpdateSender(Context context) {
        this.context = context;
        queue = Volley.newRequestQueue(this.context);
    }

    public void locationUpdate(LocationUpdate location) {
        Log.d(TAG, "Sending a location update");
        String url = "http://192.168.0.101:9000/api/locations/5774f31b43365a7c749769c1/100";

        JSONObject json = new JSONObject(location.mapProperties());

        JsonObjectRequest jsonRequest = new JsonObjectRequest
                (Request.Method.PUT, url, json, new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject response) {
                        Toast.makeText(context, "On response json", Toast.LENGTH_SHORT).show();
                    }
                }, new Response.ErrorListener() {

                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(context, "Eroare " + error.toString(), Toast.LENGTH_SHORT).show();
                    }
                });

        queue.add(jsonRequest);
    }

}
