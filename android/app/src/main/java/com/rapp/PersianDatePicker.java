package com.rapp;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.mohamadamin.persianmaterialdatetimepicker.date.DatePickerDialog;
import com.mohamadamin.persianmaterialdatetimepicker.utils.PersianCalendar;

/**
 * Created by Farid on 4/23/18.
 */

public class PersianDatePicker extends ReactContextBaseJavaModule implements DatePickerDialog.OnDateSetListener {
    private Promise mPromise;
    public PersianDatePicker(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "PersianDatePicker";
    }


    @ReactMethod
    public void showDatePicker(Promise promise) {
        mPromise = promise;
        PersianCalendar persianCalendar = new PersianCalendar();
        DatePickerDialog datePickerDialog = DatePickerDialog.newInstance(
                PersianDatePicker.this,
                persianCalendar.getPersianYear(),
                persianCalendar.getPersianMonth(),
                persianCalendar.getPersianDay()
        );
        datePickerDialog.show(getCurrentActivity().getFragmentManager(), "Datepickerdialog");
    }

    @ReactMethod
    public void setDatePicker(int year, int month , int day , Promise promise) {
        mPromise = promise;
        PersianCalendar persianCalendar = new PersianCalendar();
        DatePickerDialog datePickerDialog = DatePickerDialog.newInstance(
                PersianDatePicker.this,
                year,
                month - 1,
                day
        );
        datePickerDialog.show(getCurrentActivity().getFragmentManager(), "Datepickerdialog");
    }

    @Override
    public void onDateSet(DatePickerDialog view, int year, int monthOfYear, int dayOfMonth) {
        WritableMap map = Arguments.createMap();
        map.putInt("year" , year);
        map.putInt("month" , monthOfYear + 1);
        map.putInt("day" , dayOfMonth);
        mPromise.resolve(map);
    }
}
