package com.ipl.util;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Environment;
import android.support.annotation.NonNull;
import android.support.v4.content.Loader;
import android.util.Log;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Created by bridgeit007 on 2/6/16.
 */

public class PictureUtil {
    public static String TAG="Image Downloading";
    public static File getSavePath(String filename) {
        File filePath;
        if (hasSDCard()) {
            filePath = new File(getSDCardPath() + "/Images/"+filename);
            try {
                filePath.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            filePath = Environment.getDataDirectory();
        }
        return filePath;
    }

    public static Bitmap loadFileFromCache(String filename) {
        return loadFromFile(getCacheFilename(filename));
    }

    //Convert imageUrl to Image
    public static void urlToImageDownload(String imgUrl,String filename){
        try {
            URL url= new URL(imgUrl);
            Bitmap bitmap=BitmapFactory.decodeStream(url.openConnection().getInputStream());
            storeImageInFile(bitmap,filename);
            Log.d(TAG,"enter in the urlToImageDownload()");
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    //Convert imageUrl to Bitmap
    public static Bitmap urlToBitmap(String imgUrl){
        Bitmap bitmap=null;
        try {
            URL url= new URL(imgUrl);
             bitmap=BitmapFactory.decodeStream(url.openConnection().getInputStream());
            return bitmap;
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return bitmap;
    }
    public static void saveToFile(String filename, Bitmap bmp) {
        try {
            Log.d(TAG,"enter into saveToFile()");
            FileOutputStream fileOutputStream = new FileOutputStream(filename);
            bmp.compress(Bitmap.CompressFormat.PNG, 100, fileOutputStream);
            fileOutputStream.flush();
            fileOutputStream.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static String getCacheFilename(String filename) {
        File cacheFile = getSavePath(filename);
        return cacheFile.getAbsolutePath();
    }

    private static Bitmap loadFromFile(String filename) {
        File file = new File(filename);
        try {
            if (!file.exists())
                return null;

            Bitmap btm = BitmapFactory.decodeFile(filename);
            return btm;
        } catch (Exception e) {
            return null;
        }
    }

    private static String getSDCardPath() {
        File filePath = Environment.getExternalStorageDirectory();
        return filePath.getAbsolutePath();
    }

    //--method to check if there is External SD card is available or not
    private static boolean hasSDCard() {
        String status = Environment.getExternalStorageState();
        return status.equals(Environment.MEDIA_MOUNTED);
    }

    //store image in sdcard
    public static void storeImageInFile(Bitmap bitmap, String ImageName) {
        String root = Environment.getExternalStorageDirectory().getAbsolutePath() + "/";
        try {
            File directory = new File(root + "/Images");
            if (!directory.exists()) {
                directory.mkdirs();
            }
            OutputStream fOut = null;

            File myPath = new File(directory, ImageName);
            if (myPath.exists())
                myPath.delete();
            myPath.createNewFile();
            fOut = new FileOutputStream(myPath);
            bitmap.compress(Bitmap.CompressFormat.PNG, 80, fOut);
            fOut.flush();
            fOut.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
