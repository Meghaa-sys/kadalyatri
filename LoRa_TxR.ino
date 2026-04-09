#include <SPI.h>
#include <LoRa.h>

// LoRa pins
#define SS 5
#define RST 14
#define DIO0 26

// Push button pin
#define BUTTON_PIN 4   // change if needed

// Sample coordinates (you can replace with GPS later)
float lat = 10.039036;
float lon = 76.322670;

void setup() {
  Serial.begin(115200);

  pinMode(BUTTON_PIN, INPUT_PULLUP); // button to GND

  LoRa.setPins(SS, RST, DIO0);

  if (!LoRa.begin(433E6)) {
    Serial.println("LoRa Init Failed");
    while (1);
  }

  Serial.println("LoRa Sender Ready");
}

void loop() {

  // Button pressed (LOW because pull-up)
  if (digitalRead(BUTTON_PIN) == LOW) {

    Serial.println("🚨 BUTTON PRESSED - Sending SOS");

    String payload = "{";
    payload += "\"lat\":" + String(lat,6) + ",";
    payload += "\"lon\":" + String(lon,6);
    payload += "}";

    LoRa.beginPacket();
    LoRa.print(payload);
    LoRa.endPacket();

    Serial.println("📡 Sent:");
    Serial.println(payload);

    delay(1000); // debounce + prevent spam
  }
}
