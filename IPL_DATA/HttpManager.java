package einfoplanet.com.ipl.utility;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
/*
*   HttpManager class is used to get the data from the server.
*   We passing the url to the method getData().
*/
public class HttpManager {

    public static String getData(String uri) {
        URL url= null;
        try {
            url = new URL(uri);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        try {
            assert url != null;
            HttpURLConnection connection= (HttpURLConnection) url.openConnection();
            InputStream in = new BufferedInputStream(connection.getInputStream());
            return convertStreamToString(in);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
    //--Method to convert the stream data into the string
    private static String convertStreamToString(java.io.InputStream is) {
        java.util.Scanner s = new java.util.Scanner(is).useDelimiter("\\A");
        return s.hasNext() ? s.next() : "";
    }
}
