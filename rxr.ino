#include <WiFi.h>
#include <esp_now.h>

typedef struct struct_message {
  float latitude;
  float longitude;
} struct_message;

struct_message gpsData;

void OnDataRecv(const esp_now_recv_info *info, const uint8_t *data, int len) {

  memcpy(&gpsData, data, sizeof(gpsData));

  Serial.print("Latitude: ");
  Serial.println(gpsData.latitude);

  Serial.print("Longitude: ");
  Serial.println(gpsData.longitude);

  Serial.println("------");
}

void setup() {

  Serial.begin(115200);

  WiFi.mode(WIFI_STA);

  if (esp_now_init() != ESP_OK) {
    Serial.println("ESP-NOW Init Failed");
    return;
  }

  esp_now_register_recv_cb(OnDataRecv);

  Serial.println("Receiver Ready");
  
}

void loop() {
}
