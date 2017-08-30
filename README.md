Steps to publish on Android:
1. ionic cordova build android --release --production --minifyjs --minifycss --optimizejs --aot
(If keystore not generated) 2. keytool -genkey -v -keystore my-release-key.keystore -alias ppeetteerrs -keyalg RSA -keysize 2048 -validity 10000
3. cd platforms/android/build/outputs/apk/
4. jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android-release-unsigned.apk ppeetteerrs
5. zipalign -v 4 android-release-unsigned.apk FoodVoucher_prod_V1.0.0.apk (or FoodVoucher_test_V1.0.0.apk)

