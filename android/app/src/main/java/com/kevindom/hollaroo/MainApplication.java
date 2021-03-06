package com.kevindom.hollaroo;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import com.reactnativenavigation.BuildConfig;
import com.reactnativenavigation.NavigationApplication;

import java.util.Arrays;
import java.util.List;

import co.apptailor.googlesignin.RNGoogleSigninPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;

public class MainApplication extends NavigationApplication {

	@Override
	public boolean isDebug() {
		// Make sure you are using BuildConfig from your own application
		return BuildConfig.DEBUG;
	}

	protected List<ReactPackage> getPackages() {
		// Add additional packages you require here
		// No need to add RnnPackage and MainReactPackage
		return Arrays.<ReactPackage>asList(
				new MainReactPackage(),
				new RNCardViewPackage(),
				new RNFirebasePackage(),
				new RNFirebaseAuthPackage(),
				new RNFirebaseFirestorePackage(),
				new RNGoogleSigninPackage()
		);
	}

	@Override
	public List<ReactPackage> createAdditionalReactPackages() {
		return getPackages();
	}

	@Override
	public String getJSMainModuleName() {
		return "index";
	}
}
