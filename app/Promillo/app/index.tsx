import { useState } from 'react';
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import BarcodeScanner from '../components/BarcodeScanner';
import { BASE_SCAN_URL } from '../config/config';
import TrashCan from '../assets/icons/TrashCan';

export default function Index() {
  const [scannerVisible, setScannerVisible] = useState(false);
  const [barcodes, setBarcodes] = useState<string[]>([]);

  const handleScanned = (code: string) => {
    setScannerVisible(false);
    setBarcodes(prev => (prev.includes(code) ? prev : [...prev, code]));
  };

  const deleteBarcode = (code: string) => {
    setBarcodes(prev => prev.filter(item => item !== code));
  };

  const openUrlWithBarcodes = async () => {
    if (barcodes.length === 0) {
      Alert.alert('No barcodes', 'Please scan at least one barcode before continuing.');
      return;
    }
    const joined = barcodes.join(',');
    const url = `${BASE_SCAN_URL}?barcodes=${encodeURIComponent(joined)}`;
    await WebBrowser.openBrowserAsync(url);
  };

  if (scannerVisible) {
    return <BarcodeScanner onScanned={handleScanned} />;
  }

return (
  <View style={styles.container}>
    <StatusBar style="dark" />

    <View style={styles.content}>
      {barcodes.length === 0 ? (
        <>
          <Text style={styles.message}>No barcodes yet. Start scanning!</Text>
          <View style={styles.buttonGroup}>
            <Button title="Start Scanner" onPress={() => setScannerVisible(true)} />
          </View>
        </>
      ) : (
        <FlatList
          data={barcodes}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.barcodeItem}>
              <Text style={styles.barcodeText}>{item}</Text>
              <TouchableOpacity
                onPress={() => deleteBarcode(item)}
                style={styles.deleteButton}
              >
                <TrashCan size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
          ListFooterComponent={
            <View style={styles.buttonGroup}>
              <Button title="Start Scanner" onPress={() => setScannerVisible(true)} />
            </View>
          }
        />
      )}
    </View>

    <View style={styles.bottomButton}>
      <Button title="Get Drink Recommendations" onPress={openUrlWithBarcodes} />
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  message: { fontSize: 16, textAlign: 'center', marginVertical: 20 },
  barcodeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  barcodeText: { fontSize: 16 },
  deleteButton: { paddingHorizontal: 8 },
  deleteText: { fontSize: 16, color: 'red' },
  buttonGroup: { marginTop: 20 },
  content: { flex: 1 },
  bottomButton: { paddingBottom: 20 },
  buttonGroup: {
    marginTop: 20,
    marginBottom: 40,
  }

});
