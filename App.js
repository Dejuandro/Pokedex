import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { configureStore } from '@reduxjs/toolkit';
import reducers from './Redux/reducers';
import { Provider } from 'react-redux'
import MainScreen from './Screen/MainScreen';


const store = configureStore({ reducer: reducers })

export default function App() {


  useEffect(() => {
    // checkToken();
  }, [])

  return (
        <Provider store={store}>
            <MainScreen/>
        </Provider>
  )
};