package com.awesomeproject;

import android.app.Activity;
import android.content.Intent;
import android.provider.ContactsContract;
import android.util.Log;

import com.awesomeproject.contact.ContactManager;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;

import javax.annotation.Nullable;

import static android.app.Activity.RESULT_OK;

public class ContactPickerModule extends ReactContextBaseJavaModule {
    public static final String DEBUG_TAG = "#debug";
    private static final int PICK_CONTACT_REQUEST = 7788;
    private static final String CONTACT_PICKER_MODULE = "ContactPickerModule";
    private static final String ERR_ACTIVITY_DOES_NOT_EXIST = "ERR_ACTIVITY_DOES_NOT_EXIST";
    private static final String ERR_PICKER_CANCELLED = "ERR_PICKER_CANCELLED";
    private static final String PICKER_CANCELLED_TEXT = "Contact picker cancelled.";
    private static final String ERR_FAILED_TO_SHOW_PICKER = "ERR_FAILED_TO_SHOW_PICKER";
    private static final String PICK_CONTACT_TEXT = "Trying to pick a contact.";
    private static final String ERR_READ_CONTACT = "ERR_READ_CONTACT";
    private static final String READ_CONTACT_TEXT = "Error during reading contact data.";
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
//                        WritableMap contactMap = processResult(data);
//                        if (contactMap != null) {
//                            mPickerPromise.resolve(contactMap);
//                        } else {
//                            mPickerPromise.reject(ERR_READ_CONTACT, READ_CONTACT_TEXT);
//                        }
                        ContactManager contactManager = new ContactManager(getCurrentActivity().getContentResolver());
                        contactManager.processIntent(data, mPickerPromise);
                    }
                }
            } else {
                Log.e("ContactPickerModule", "Wut? We have lost the Promise object!");
            }
        }
    };

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
    public void selectContact(boolean forceChooser, Promise promise) {
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
