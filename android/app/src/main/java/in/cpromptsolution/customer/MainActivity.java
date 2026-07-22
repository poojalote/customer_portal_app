package in.cpromptsolution.customer;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.core.content.FileProvider;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebChromeClient;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import android.app.DownloadManager;
import android.webkit.DownloadListener;
import android.webkit.URLUtil;
import android.widget.Toast;

public class MainActivity extends BridgeActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    if (savedInstanceState != null && getBridge() != null && getBridge().getWebView() != null) {
      getBridge().getWebView().restoreState(savedInstanceState);
    }

    WebView webView = getBridge().getWebView();
    webView.setWebChromeClient(new FullChooserWebChromeClient(getBridge()));

    webView.setDownloadListener(new DownloadListener() {
      @Override
      public void onDownloadStart(String url,
                                  String userAgent,
                                  String contentDisposition,
                                  String mimeType,
                                  long contentLength) {

        DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url));

        request.setMimeType(mimeType);
        request.addRequestHeader("User-Agent", userAgent);

        String fileName = URLUtil.guessFileName(url, contentDisposition, mimeType);

        request.setTitle(fileName);
        request.setDescription("Downloading...");
        request.setNotificationVisibility(
                DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED
        );

        request.setDestinationInExternalPublicDir(
                Environment.DIRECTORY_DOWNLOADS,
                fileName
        );

        DownloadManager dm =
                (DownloadManager) getSystemService(DOWNLOAD_SERVICE);

        if (dm != null) {
          dm.enqueue(request);
          Toast.makeText(MainActivity.this,
                  "Download started",
                  Toast.LENGTH_SHORT).show();
        }
      }
    });
    ViewCompat.setOnApplyWindowInsetsListener(webView, (view, windowInsets) -> {
      Insets systemBars = windowInsets.getInsets(WindowInsetsCompat.Type.systemBars());
      view.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
      return WindowInsetsCompat.CONSUMED;
    });
  }

  @Override
  public void onSaveInstanceState(Bundle outState) {
    super.onSaveInstanceState(outState);
    if (getBridge() != null && getBridge().getWebView() != null) {
      getBridge().getWebView().saveState(outState);
    }
  }


  /**
   * Extends Capacitor's default BridgeWebChromeClient (which already handles
   * geolocation prompts, getUserMedia permission requests, JS dialogs, etc.)
   * and only overrides the file chooser to always present a full picker
   * (Camera + Gallery/Files) instead of jumping straight to the camera when
   * the page's <input type="file" capture> attribute requests it.
   */
  private class FullChooserWebChromeClient extends BridgeWebChromeClient {

    private final ActivityResultLauncher<Intent> chooserLauncher;
    private ValueCallback<Uri[]> filePathCallback;
    private String cameraPhotoUri;

    FullChooserWebChromeClient(com.getcapacitor.Bridge bridge) {
      super(bridge);
      chooserLauncher = registerForActivityResult(
        new ActivityResultContracts.StartActivityForResult(),
        this::handleChooserResult
      );
    }

    @Override
    public boolean onShowFileChooser(
      WebView webView,
      ValueCallback<Uri[]> callback,
      FileChooserParams fileChooserParams
    ) {
      if (filePathCallback != null) {
        filePathCallback.onReceiveValue(null);
      }
      filePathCallback = callback;
      cameraPhotoUri = null;

      Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
      if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
        File photoFile = createImageFile();
        if (photoFile != null) {
          Uri photoUri = FileProvider.getUriForFile(
            MainActivity.this,
            getApplicationContext().getPackageName() + ".fileprovider",
            photoFile
          );
          cameraPhotoUri = photoUri.toString();
          takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoUri);
          takePictureIntent.addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
        } else {
          takePictureIntent = null;
        }
      } else {
        takePictureIntent = null;
      }

      Intent contentSelectionIntent = new Intent(Intent.ACTION_GET_CONTENT);
      contentSelectionIntent.addCategory(Intent.CATEGORY_OPENABLE);
      contentSelectionIntent.setType("*/*");
      boolean allowMultiple = fileChooserParams.getMode() == FileChooserParams.MODE_OPEN_MULTIPLE;
      contentSelectionIntent.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, allowMultiple);

      Intent[] initialIntents = takePictureIntent != null
        ? new Intent[] { takePictureIntent }
        : new Intent[0];

      Intent chooserIntent = new Intent(Intent.ACTION_CHOOSER);
      chooserIntent.putExtra(Intent.EXTRA_INTENT, contentSelectionIntent);
      chooserIntent.putExtra(Intent.EXTRA_TITLE, "Choose an option");
      chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, initialIntents);

      try {
        chooserLauncher.launch(chooserIntent);
      } catch (ActivityNotFoundException e) {
        filePathCallback.onReceiveValue(null);
        filePathCallback = null;
      }

      return true;
    }

    private void handleChooserResult(ActivityResult result) {
      if (filePathCallback == null) {
        return;
      }

      Uri[] results = null;
      Intent data = result.getData();
      if (result.getResultCode() == RESULT_OK) {
        if (data != null && data.getDataString() != null) {
          results = new Uri[] { Uri.parse(data.getDataString()) };
        } else if (data != null && data.getClipData() != null) {
          int count = data.getClipData().getItemCount();
          results = new Uri[count];
          for (int i = 0; i < count; i++) {
            results[i] = data.getClipData().getItemAt(i).getUri();
          }
        } else if (cameraPhotoUri != null) {
          results = new Uri[] { Uri.parse(cameraPhotoUri) };
        }
      }

      filePathCallback.onReceiveValue(results);
      filePathCallback = null;
    }

    private File createImageFile() {
      try {
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault()).format(new Date());
        String imageFileName = "IMG_" + timeStamp + "_";
        File storageDir = getExternalFilesDir(Environment.DIRECTORY_PICTURES);
        return File.createTempFile(imageFileName, ".jpg", storageDir);
      } catch (IOException ex) {
        return null;
      }
    }
  }
}
