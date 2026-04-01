#include <esp_now.h>
#include <WiFi.h>

// Structure must match sender
typedef struct struct_message {
  float latitude;
  float longitude;
} struct_message;

struct_message incomingData;

// ✅ UPDATED callback (new format)
void OnDataRecv(const esp_now_recv_info *info, const uint8_t *incomingDataBytes, int len) {
  
  // Copy received data
  memcpy(&incomingData, incomingDataBytes, sizeof(incomingData));

  // Get sender MAC
  const uint8_t *mac = info->src_addr;

  Serial.print("Received from: ");
  for (int i = 0; i < 6; i++) {
    Serial.printf("%02X", mac[i]);
    if (i < 5) Serial.print(":");
  }
  Serial.println();

  Serial.println("Data Received:");
  Serial.print("Latitude: ");
  Serial.println(incomingData.latitude, 6);
  Serial.print("Longitude: ");
  Serial.println(incomingData.longitude, 6);
  Serial.println("-------------------");
}

void setup() {
  Serial.begin(115200);

  // Set device as WiFi Station
  WiFi.mode(WIFI_STA);

  // Init ESP-NOW
  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }

  // Register receive callback
  esp_now_register_recv_cb(OnDataRecv);

  Serial.println("ESP-NOW Receiver Ready");
}

void loop() {
  // Nothing needed here
}
