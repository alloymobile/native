import react from 'react';
import { styled } from 'nativewind';

import { Text, View } from 'react-native';


const StyledView = styled(View);
const StyledText = styled(Text);

export default function App() {
  return (
    <StyledView className="flex-1 items-center justify-center">
      <StyledText className="text-slate-800">Open up App.js to start working on your app!</StyledText>
    </StyledView>
  );
}
