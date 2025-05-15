import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraVisible, setCameraVisible] = useState(false);
  const [facing] = useState<'back' | 'front'>('back'); // ✅ use string union type
  const [scanned, setScanned] = useState(false);
  const [lastCode, setLastCode] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (showAlert && lastCode) {
      Alert.alert(
        'EAN-13 Barcode Scanned',
        `Code: ${lastCode}`,
        [
          {
            text: 'OK',
            onPress: () => setShowAlert(false),
          },
        ],
        { cancelable: false }
      );
    }
  }, [showAlert, lastCode]);

  function handleBarcodeScanned({ data, type }: { data: string; type: string }) {
    if (scanned || type !== 'ean13') return;
    console.log('Scanned EAN-13:', data);

    setScanned(true);
    setLastCode(data);
    setShowAlert(true);

    setTimeout(() => setScanned(false), 3000);
  }

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  if (!cameraVisible) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Tap to start scanning EAN-13 barcodes.</Text>
        <Button title="Start Scanner" onPress={() => setCameraVisible(true)} />
        {lastCode && <Text style={styles.result}>Last scanned code: {lastCode}</Text>}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing} // ✅ this is now just 'back'
        onBarcodeScanned={handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['ean13'],
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => setCameraVisible(false)}>
            <Text style={styles.text}>Stop Scanner</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  message: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 16,
  },
  result: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 16,
    fontWeight: 'bold',
  },
  camera: { flex: 1 },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 32,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#000000aa',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
