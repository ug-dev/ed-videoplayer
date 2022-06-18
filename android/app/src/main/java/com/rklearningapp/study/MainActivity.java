package com.rklearningapp.study;
import com.facebook.react.ReactActivity;
import android.os.Bundle; // here
import android.view.WindowManager;
import android.content.pm.ActivityInfo;


import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {
  @Override
    protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this);
      super.onCreate(savedInstanceState);
      if (android.os.Build.VERSION.SDK_INT != android.os.Build.VERSION_CODES.O) {
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
      }
      // getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);
    }


  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "RKLearning";
  }

  
}
