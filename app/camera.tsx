import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router'; 
import { useContext, useRef, useState } from 'react';
import { Button, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { AppContext } from '../components/AppContext'; 

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [previewUri, setPreviewUri] = useState(null);
  const cameraRef = useRef(null);
  const { photos, setPhotos, requiredPhotos } = useContext(AppContext);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>L'application a besoin d'accéder à la caméra.</Text>
        <Button onPress={requestPermission} title="Accorder la permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPreviewUri(photo.uri);
    }
  };

  const validatePhoto = () => {
    const newPhotos = [...photos, previewUri];
    setPhotos(newPhotos);
    setPreviewUri(null);

    if (newPhotos.length >= requiredPhotos) {
      router.back(); 
    }
  };

  if (previewUri) {
    return (
      <SafeAreaView style={styles.container}>
        <Image source={{ uri: previewUri }} style={styles.preview} />
        <View style={styles.previewButtons}>
          <Button title="Reprendre" onPress={() => setPreviewUri(null)} color="red" />
          <Button title="Valider cette photo" onPress={validatePhoto} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <Text style={styles.counterText}>
            Photo {photos.length + 1} / {requiredPhotos}
          </Text>
          <Button title="Prendre la photo" onPress={takePicture} />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: '#000' },
  text: { color: 'white', textAlign: 'center', marginBottom: 20 },
  camera: { flex: 1 },
  buttonContainer: { flex: 1, backgroundColor: 'transparent', justifyContent: 'flex-end', padding: 20 },
  counterText: { color: 'white', fontSize: 18, textAlign: 'center', marginBottom: 20, fontWeight: 'bold' },
  preview: { flex: 1, resizeMode: 'contain' },
  previewButtons: { flexDirection: 'row', justifyContent: 'space-around', padding: 20, backgroundColor: '#000' }
});