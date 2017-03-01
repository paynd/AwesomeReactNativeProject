package com.awesomeproject;

import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.provider.ContactsContract;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;

import javax.annotation.Nullable;

import static android.app.Activity.RESULT_OK;

/**
 * Created by paynd on 01.03.17.
 */

public class ContactPickerModule extends ReactContextBaseJavaModule {
    private static final String CONTACT_PICKER_MODULE = "CONTACT_PICKER_MODULE";
    private static final int PICK_CONTACT_REQUEST = 55667788;
    private static final String ERR_ACTIVITY_DOES_NOT_EXIST = "ERR_ACTIVITY_DOES_NOT_EXIST";
    private static final String ERR_PICKER_CANCELLED = "ERR_PICKER_CANCELLED";
    private static final String PICKER_CANCELLED_TEXT = "Contact picker cancelled.";
    private static final String ERR_FAILED_TO_SHOW_PICKER = "ERR_FAILED_TO_SHOW_PICKER";
    private static final String PICK_CONTACT_TEXT = "Trying to pick a contact.";

    private Promise mPickerPromise;

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            super.onActivityResult(activity, requestCode, resultCode, data);
            if (requestCode == PICK_CONTACT_REQUEST) {
                if (mPickerPromise != null) {
                    if (resultCode == Activity.RESULT_CANCELED) {
                        mPickerPromise.reject(ERR_PICKER_CANCELLED, PICKER_CANCELLED_TEXT);
                    } else if (resultCode == RESULT_OK) {
                        processResult(activity, data);
                    }
                }
            } else {
                Log.e("ContactPickerModule", "Wut? We have lost the Promise object!");
            }
        }

        @Override
        public void onNewIntent(Intent intent) {
            super.onNewIntent(intent);
        }
    };

//    private void processResult(Activity activity, Intent data) {
//        activity.startActivity(new Intent(Intent.ACTION_VIEW,
//                data.getData()));
//    }

    private void processResult(Activity activity, Intent data) {
        Uri contactData = data.getData();
        Cursor c =  activity.getContentResolver().query(contactData, null, null, null, null);
        if (c.moveToFirst()) {
            String name = c.getString(c.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME));
            // TODO here we need to construct a new object to return into promise
        }
    }

    public ContactPickerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return CONTACT_PICKER_MODULE;
    }

    /**
     * Констант ннннада?!
     *
     * @return map filled with constants
     */
    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        return super.getConstants();
    }

    /**
     * Here we launch the contact picker
     *
     * @param forceChooser true if we need to force user to choose contacts app
     */
    @ReactMethod
    public void selectContact(Promise promise, boolean forceChooser) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            promise.reject(ERR_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }

        mPickerPromise = promise;

        try {
            final Intent contactIntent = new Intent(Intent.ACTION_PICK,
                    ContactsContract.Contacts.CONTENT_URI);

            final Intent chooserIntent = Intent.createChooser(contactIntent, PICK_CONTACT_TEXT);

            currentActivity.startActivityForResult(
                    forceChooser ? chooserIntent : contactIntent
                    , PICK_CONTACT_REQUEST, null);
        } catch (Exception e) {
            mPickerPromise.reject(ERR_FAILED_TO_SHOW_PICKER, e);
            mPickerPromise = null;
        }
    }
}
