#include <WiFi.h>
#include <PubSubClient.h>
#include <SPI.h>
#include <LoRa.h>

const char* ssid = "Tinker Space";
const char* password = "123tinkerspace";

const char* mqtt_server = "broker.hivemq.com";

WiFiClient espClient;
PubSubClient client(espClient);

// LoRa Pins
#define SS 5
#define RST 14
#define DIO0 26

void reconnect() {
  while (!client.connected()) {
    Serial.print("Connecting MQTT...");

    if (client.connect("ESP32Receiver")) {
      Serial.println("connected");
    } else {
      Serial.print("failed ");
      Serial.println(client.state());
      delay(2000);
    }
  }
}

void publishSOS(float lat, float lon) {

  String payload = "{";
  payload += "\"lat\":" + String(lat,6) + ",";
  payload += "\"lon\":" + String(lon,6);
  payload += "}";

  client.publish("kadal/sos", payload.c_str());

  Serial.println("📡 SOS sent via MQTT");
  Serial.println(payload);
}

void setup() {

  Serial.begin(115200);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  Serial.print("Connecting WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi Connected");

  client.setServer(mqtt_server, 1883);

  // 🔥 LoRa INIT (replaces ESP-NOW)
  LoRa.setPins(SS, RST, DIO0);

  if (!LoRa.begin(433E6)) {
    Serial.println("LoRa Init Failed");
    while (1);
  }

  Serial.println("LoRa Receiver Ready");
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }

  client.loop();

  // 🔥 LoRa RECEIVE (replaces OnDataRecv)
  int packetSize = LoRa.parsePacket();

  if (packetSize) {

    String incoming = "";

    while (LoRa.available()) {
      incoming += (char)LoRa.read();
    }

    Serial.println("🚨 SOS RECEIVED");

    float lat, lon;

    // same format parsing
    sscanf(incoming.c_str(), "{\"lat\":%f,\"lon\":%f}", &lat, &lon);

    Serial.print("Latitude: ");
    Serial.println(lat,6);

    Serial.print("Longitude: ");
    Serial.println(lon,6);

    publishSOS(lat, lon);
  }
}
