import { StyleSheet, Text, View } from 'react-native';
import Press from './press';
import Scroll from './Scroll';
import ImageOb from './ImageOb';
import Flat from './Flat';
import Input from './Input';
import MyModal from './MyModal';
import Lay from './Layout';

export default function App() {
  return (
    <View style={styles.container}>
      <Lay />
      {/* <MyModal />
      <Input />
      <Press />
      <Scroll />
      <ImageOb />
      <Flat /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
