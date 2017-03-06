package com.awesomeproject.contact;

import android.content.ContentResolver;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.provider.ContactsContract;
import android.support.annotation.NonNull;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import static android.provider.ContactsContract.CommonDataKinds.Email;
import static android.provider.ContactsContract.CommonDataKinds.Event;
import static android.provider.ContactsContract.CommonDataKinds.Phone;
import static android.provider.ContactsContract.CommonDataKinds.StructuredName;
import static android.provider.ContactsContract.CommonDataKinds.StructuredPostal;
import static android.provider.ContactsContract.CommonDataKinds.Website;

/**
 * Created by paynd on 03.03.17.
 */

public class ContactManager {
    public static final String DEBUG_TAG = "#debug";
    public static final String TYPE = "type";
    public static final String UNDEF = "undefined";


    private static final String[] PROJECTION_PHONES =
            {
                    Phone.NUMBER,
                    Phone.TYPE,
                    Phone.LABEL
            };
    private static final String[] PROJECTION_WEBSITES =
            {
                    Website.URL,
                    Website.TYPE
            };
    private static final String[] PROJECTION_BIRTHDAY =
            {
                    Event.START_DATE
            };
    private static final String[] PROJECTION_EMAIL =
            {
                    Email.ADDRESS,
                    Email.TYPE,
                    Email.LABEL
            };
    private static final String[] PROJECTION_NAME =
            {
                    StructuredName.DISPLAY_NAME,
                    StructuredName.FAMILY_NAME,
                    StructuredName.MIDDLE_NAME,
                    StructuredName.GIVEN_NAME,
            };
    private static final String[] PROJECTION_ADDRESS =
            {
                    StructuredPostal.FORMATTED_ADDRESS,
                    StructuredPostal.STREET,
                    StructuredPostal.POBOX,
                    StructuredPostal.POSTCODE,
                    StructuredPostal.NEIGHBORHOOD,
                    StructuredPostal.CITY,
                    StructuredPostal.REGION,
                    StructuredPostal.COUNTRY,
            };
    private static final String[] PHOTO_PROJECTION =
            {
                    ContactsContract.CommonDataKinds.Contactables.PHOTO_URI
            };

    private static final String SELECTION_LOOKUP_KEY = ContactsContract.Data.LOOKUP_KEY + " = ? AND "
            + ContactsContract.Data.MIMETYPE + "='";
    private static final String SELECTION_NAME =
            SELECTION_LOOKUP_KEY + StructuredName.CONTENT_ITEM_TYPE + "'";
    private static final String SELECTION_EMAILS =
            SELECTION_LOOKUP_KEY + Email.CONTENT_ITEM_TYPE + "'";
    private static final String SELECTION_POSTALS =
            SELECTION_LOOKUP_KEY + StructuredPostal.CONTENT_ITEM_TYPE + "'";
    private static final String SELECTION_PHONES =
            SELECTION_LOOKUP_KEY + Phone.CONTENT_ITEM_TYPE + "'";
    private static final String SELECTION_WEBSITE =
            SELECTION_LOOKUP_KEY + Website.CONTENT_ITEM_TYPE + "'";
    private static final String SELECTION_BIRTHDAY =
            SELECTION_LOOKUP_KEY +
                    Event.CONTENT_ITEM_TYPE + "' AND " +
                    Event.TYPE + "=" +
                    Event.TYPE_BIRTHDAY;
    private static final String SELECTION_PHOTO =
            SELECTION_LOOKUP_KEY + ContactsContract.CommonDataKinds.Photo.CONTENT_ITEM_TYPE + "'";


    private final ContentResolver contentResolver;
    private Contact contact;

    public ContactManager(ContentResolver contentResolver) {
        this.contentResolver = contentResolver;
        contact = new Contact();
    }

    public void processIntent(Intent data, Promise promise) {
        Uri contactData = data.getData();
        String lookup = Uri.parse(contactData.getPath()).getPathSegments().get(2);
        Log.d(DEBUG_TAG, "lookup# " + lookup);

        // FIXME: 06.03.17 add concurrent execution

        loadBirthday(lookup);
        loadPostals(lookup);
        loadNames(lookup);
        loadEmails(lookup);
        loadPhones(lookup);
        loadWebsites(lookup);
        loadPhotoUri(lookup);

        promise.resolve(contact.getContact()); // FIXME: 06.03.17 add error handling
    }

    private void loadBirthday(@NonNull String lookup) {
        Log.d(DEBUG_TAG, "loadBirthday, lookup# " + lookup);
        Cursor cursor = contentResolver.query(
                ContactsContract.Data.CONTENT_URI,
                PROJECTION_BIRTHDAY,
                SELECTION_BIRTHDAY,
                new String[]{
                        lookup
                },
                null
        );

        try {
            contact.setBirthday(cursor);
        } finally {
            if (cursor != null) {
                cursor.close();
            }
        }
    }

    private void loadEmails(@NonNull String lookup) {
        Log.d(DEBUG_TAG, "loadEmailInfo, lookup# " + lookup);
        Cursor cursor = contentResolver.query(
                Email.CONTENT_URI,
                PROJECTION_EMAIL,
                SELECTION_EMAILS,
                new String[]{
                        lookup
                },
                null
        );

        try {
            contact.setEmails(cursor);
        } finally {
            if (cursor != null) {
                cursor.close();
            }
        }
    }

    private void loadPostals(@NonNull String lookup) {
        Log.d(DEBUG_TAG, "loadPostalAddressInfo, lookup# " + lookup);
        Cursor cursor = contentResolver.query(
                StructuredPostal.CONTENT_URI,
                PROJECTION_ADDRESS,
                SELECTION_POSTALS,
                new String[]{
                        lookup
                },
                null
        );

        try {
            contact.setPostals(cursor);
        } finally {
            if (cursor != null) {
                cursor.close();
            }
        }
    }

    private void loadNames(@NonNull String lookup) { //+
        Log.d(DEBUG_TAG, "loadPostalAddressInfo, lookup# " + lookup);
        Cursor cursor = contentResolver.query(
                ContactsContract.Data.CONTENT_URI,
                PROJECTION_NAME,
                SELECTION_NAME,
                new String[]{
                        lookup
                },
                null
        );

        try {
            contact.setName(cursor);
        } finally {
            if (cursor != null) {
                cursor.close();
            }
        }
    }

    private void loadPhones(@NonNull String lookup) {
        Log.d(DEBUG_TAG, "fillPhones");
        Cursor cursor = null;
        try {
            cursor = contentResolver.query(ContactsContract.Data.CONTENT_URI,
                    PROJECTION_PHONES,
                    SELECTION_PHONES,
                    new String[]{lookup},
                    null
            );
            contact.setPhones(cursor);
        } finally {
            if (cursor != null) {
                cursor.close();
            }
        }
    }

    private void loadWebsites(String lookup) {
        Log.d(DEBUG_TAG, "fillWebsitesData");
        Cursor cursor = null;
        try {
            cursor = contentResolver.query(ContactsContract.Data.CONTENT_URI,
                    PROJECTION_WEBSITES,
                    SELECTION_WEBSITE,
                    new String[]{lookup},
                    null
            );

            contact.setWebsites(cursor);
        } finally {
            if (cursor != null) {
                cursor.close();
            }
        }
    }

    private void loadPhotoUri(String lookup) {
        Cursor cursor = contentResolver.query(
                ContactsContract.Data.CONTENT_URI,
                PHOTO_PROJECTION,
                SELECTION_PHOTO,
                new String[]{lookup},
                null
        );
        try {
            if (cursor != null && cursor.moveToNext()) {
                String rawPhotoURI = cursor.getString(
                        cursor.getColumnIndex(
                                ContactsContract.CommonDataKinds.Contactables.PHOTO_URI));
                if (!TextUtils.isEmpty(rawPhotoURI)) {
                    Log.e(DEBUG_TAG, "PHOTO: " + rawPhotoURI);
                    contact.putPhotoUri(rawPhotoURI);
                }
            }
        } finally {
            if (cursor != null) {
                cursor.close();
            }
        }
    }

    private static class Contact {
        WritableMap contact = Arguments.createMap();

        private void putString(Cursor cursor, WritableMap map, String key, String androidKey) {
            final String value = cursor.getString(cursor.getColumnIndex(androidKey));
            if (!TextUtils.isEmpty(value)) {
                map.putString(key, value);
            }
        }

        private void putString(Cursor cursor, WritableMap map, String key, Types type) {
            final String value = cursor.getString(cursor.getColumnIndex(type.getAndroidType()));
            if (!TextUtils.isEmpty(value)) {
                map.putString(key, getResolvedType(type, value));
            }
        }

        private String getResolvedType(Types type, String value) {
            try {
                switch (type) {
                    case EMAIL:
                        return resolveEmailType(Integer.parseInt(value));
                    case WEB:
                        return resolveWebsiteType(Integer.parseInt(value));
                    case PHONE:
                        return resolvePhoneType(Integer.parseInt(value));
                }
                return UNDEF;

            } catch (NumberFormatException ex) {
                Log.d(DEBUG_TAG, "NumberFormatException: => undefined");
                return UNDEF;
            }
        }

        private String resolvePhoneType(int type) {
            switch (type) {
                case Phone.TYPE_HOME:
                    return "home";
                case Phone.TYPE_WORK:
                    return "work";
                case Phone.TYPE_ASSISTANT:
                    return "assistant";
                case Phone.TYPE_CAR:
                    return "car";
                case Phone.TYPE_CALLBACK:
                    return "callback";
                case Phone.TYPE_COMPANY_MAIN:
                    return "company_main";
                case Phone.TYPE_FAX_HOME:
                    return "fax_home";
                case Phone.TYPE_FAX_WORK:
                    return "fax_work";
                case Phone.TYPE_ISDN:
                    return "isdn";
                case Phone.TYPE_MAIN:
                    return "main";
                case Phone.TYPE_MMS:
                    return "mms";
                case Phone.TYPE_MOBILE:
                    return "mobile";
                case Phone.TYPE_PAGER:
                    return "pager";
                case Phone.TYPE_TELEX:
                    return "telex";
                case Phone.TYPE_TTY_TDD:
                    return "tty_tdd";
                case Phone.TYPE_WORK_MOBILE:
                    return "work_mobile";
                case Phone.TYPE_WORK_PAGER:
                    return "work_pager";
                case Phone.TYPE_RADIO:
                    return "radio";
                default:
                    return UNDEF;
            }
        }

        private String resolveEmailType(int type) {
            switch (type) {
                case Email.TYPE_HOME:
                    return "home";
                case Email.TYPE_OTHER:
                    return "other";
                case Email.TYPE_MOBILE:
                    return "mobile"; //wtf?
                case Email.TYPE_WORK:
                    return "work";
                default:
                    return UNDEF;

            }
        }

        private String resolveWebsiteType(int type) {
            switch (type) {
                case Website.TYPE_BLOG:
                    return "blog";
                case Website.TYPE_FTP:
                    return "ftp";
                case Website.TYPE_HOME:
                    return "home";
                case Website.TYPE_HOMEPAGE:
                    return "homepage";
                case Website.TYPE_PROFILE:
                    return "profile";
                case Website.TYPE_WORK:
                    return "work";
                case Website.TYPE_OTHER:
                    return "other";
                default:
                    return UNDEF;
            }
        }

        void setBirthday(@NonNull Cursor cursor) {
            try {
                if (cursor.moveToFirst()) {
                    putString(cursor, contact, "date_of_birth", Event.START_DATE);
                }
            } finally {
                cursor.close();
            }
        }

        void putPhotoUri(String uri) {
            if (!TextUtils.isEmpty(uri)) {
                contact.putString("prhoto_uri", uri);
            }
        }

        void setName(@NonNull Cursor cursor) {
            try {
                if (cursor.moveToFirst()) {
                    putString(cursor, contact, "display_name", StructuredName.DISPLAY_NAME);
                    putString(cursor, contact, "family_name", StructuredName.FAMILY_NAME);
                    putString(cursor, contact, "given_name", StructuredName.GIVEN_NAME);
                    putString(cursor, contact, "middle_name", StructuredName.MIDDLE_NAME);
                }
            } finally {
                if (cursor != null) {
                    cursor.close();
                }
            }
        }

        void setPhones(@NonNull Cursor cursor) {
            WritableArray phones = Arguments.createArray();
            try {
                while (cursor.moveToNext()) {
                    WritableMap map = Arguments.createMap();
                    putString(cursor, map, "number", Phone.NUMBER);
                    putString(cursor, map, "label", Types.PHONE);
                    phones.pushMap(map);
                }
            } finally {
                if (cursor != null) {
                    cursor.close();
                }
            }
            Log.d(DEBUG_TAG, "\nphones array: " + phones.toString() + "\n");
            contact.putArray("phones", phones);
        }

        void setEmails(@NonNull Cursor cursor) {
            WritableArray emails = Arguments.createArray();
            try {
                while (cursor.moveToNext()) {
                    WritableMap map = Arguments.createMap();
                    putString(cursor, map, "address", Email.ADDRESS);
                    putString(cursor, map, TYPE, Types.EMAIL);
                    Log.d(DEBUG_TAG, "\nemails array: +1");
                    emails.pushMap(map);
                }
            } finally {
                if (cursor != null) {
                    cursor.close();
                }
            }

            Log.d(DEBUG_TAG, "\nemails array: " + emails.toString() + "\n");
            contact.putArray("emails", emails);
        }

        void setWebsites(@NonNull Cursor cursor) {
            WritableArray websites = Arguments.createArray();

            try {
                while (cursor.moveToNext()) {
                    WritableMap map = Arguments.createMap();
                    putString(cursor, map, "url", Website.URL);
                    putString(cursor, map, "label", Types.WEB);
                    websites.pushMap(map);
                }
            } finally {
                if (cursor != null) {
                    cursor.close();
                }
            }
            Log.d(DEBUG_TAG, "\nwebsites array: " + websites.toString() + "\n");
            contact.putArray("websites", websites);
        }

        void setPostals(@NonNull Cursor cursor) {
            WritableArray postalAddresses = Arguments.createArray();
            try {
                while (cursor.moveToNext()) {
                    WritableMap map = Arguments.createMap();
                    putString(cursor, map, "formatted_address", StructuredPostal.FORMATTED_ADDRESS);
                    putString(cursor, map, "street", StructuredPostal.STREET);
                    putString(cursor, map, "pobox", StructuredPostal.POBOX);
                    putString(cursor, map, "postcode", StructuredPostal.POSTCODE);
                    putString(cursor, map, "neighborhood", StructuredPostal.NEIGHBORHOOD);
                    putString(cursor, map, "city", StructuredPostal.CITY);
                    putString(cursor, map, "region", StructuredPostal.REGION);
                    putString(cursor, map, "country", StructuredPostal.COUNTRY);
                    postalAddresses.pushMap(map);
                }
            } finally {
                if (cursor != null) {
                    cursor.close();
                }
            }
            contact.putArray("postals", postalAddresses);
        }

        public WritableMap getContact() {
            Log.d(DEBUG_TAG, "\ngetContact: " + contact.toString() + "\n");
            return contact;
        }

        enum Types {
            EMAIL(Email.TYPE),
            WEB(Website.TYPE),
            PHONE(Phone.TYPE);

            private String type;

            Types(String type) {
                this.type = type;
            }

            public String getAndroidType() {
                return type;
            }
        }
    }
}