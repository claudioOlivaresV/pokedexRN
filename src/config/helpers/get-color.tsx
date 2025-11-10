import React from 'react';
import ImageColors from 'react-native-image-colors';

export const getColorFromImage = async (image: string) => {
  const color = await ImageColors.getColors(image, {fallback: 'grey'});

  switch (color.platform) {
    case 'android':
      return color.dominant ?? 'grey';
    case 'ios':
      return color.background ?? 'grey';
  }
};
