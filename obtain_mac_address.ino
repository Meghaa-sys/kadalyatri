#include <WiFi.h>

void setup() {
  Serial.begin(115200);
  delay(1000);  // give time for serial

  WiFi.mode(WIFI_STA);   // IMPORTANT
  delay(100);

  Serial.print("MAC Address: ");
  Serial.println(WiFi.macAddress());
}

void loop() {}
