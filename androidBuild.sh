rm android/app/src/main/assets/index.android.bundle
echo " ✳️✳️✳️ Remove success ✳️✳️✳️"
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res && rm -R android/app/src/main/res/drawable-hdpi android/app/src/main/res/drawable-mdpi android/app/src/main/res/drawable-xhdpi android/app/src/main/res/drawable-xxhdpi android/app/src/main/res/drawable-xxxhdpi android/app/src/main/res/raw || true
echo " ✳️✳️✳️ resource remove  success ✳️✳️✳️"
cd android && ./gradlew clean && cd ..
cd android && ./gradlew assembleRelease && cd ..
adb install ./android/app/build/outputs/apk/release/app-release.apk
