'use client'

import React, { useState } from 'react';
import { Card, Button, Input, Alert, Space, Typography, message } from 'antd';
import { WalletOutlined, CopyOutlined, SaveOutlined } from '@ant-design/icons';
import { ethers } from 'ethers';
import { useDispatch } from 'react-redux';
import { addWallet } from '@/store/walletSlice';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';


