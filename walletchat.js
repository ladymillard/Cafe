import React, { useState } from 'react';
import { Send, Wallet, CreditCard, MessageSquare, Bot, Coins, Exchange } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ChAIInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ChAI', text: '✨ Welcome to ChAI! Buy and exchange GC/SC credits using crypto!', time: '10:30 AM' },
    { id: 2, sender: 'System', text: 'Current Rates: 1 ETH = 1000 GC | 1 GC = 10 SC', type: 'info', time: '10:31 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showBuyCredits, setShowBuyCredits] = useState(false);
  const [showExchange, setShowExchange] = useState(false);
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('ETH');
  const [exchangeAmount, setExchangeAmount] = useState('');
  const [exchangeType, setExchangeType] = useState('GC_TO_SC');

  // Mock user wallet state
  const [userCredits, setUserCredits] = useState({
    gc: 500,
    sc: 1000,
    eth: 1.5
  });

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'You',
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setNewMessage('');
      
      setTimeout(() => {
        setMessages(msgs => [...msgs, {
          id: msgs.length + 1,
          sender: 'ChAI',
          text: 'How can I help you with your credits today? 🎮',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 1000);
    }
  };

  const handleBuyCredits = () => {
    const gcAmount = parseFloat(cryptoAmount) * 1000; // 1 ETH = 1000 GC
    setUserCredits(prev => ({
      ...prev,
      gc: prev.gc + gcAmount,
      eth: prev.eth - parseFloat(cryptoAmount)
    }));
    
    setMessages([...messages, {
      id: messages.length + 1,
      sender: 'System',
      text: `Successfully purchased ${gcAmount} GC with ${cryptoAmount} ETH! 🎮`,
      type: 'transaction',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    
    setShowBuyCredits(false);
    setCryptoAmount('');
  };

  const handleExchange = () => {
    const amount = parseFloat(exchangeAmount);
    if (exchangeType === 'GC_TO_SC') {
      const scAmount = amount * 10; // 1 GC = 10 SC
      setUserCredits(prev => ({
        ...prev,
        gc: prev.gc - amount,
        sc: prev.sc + scAmount
      }));
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'System',
        text: `Exchanged ${amount} GC for ${scAmount} SC! 🔄`,
        type: 'exchange',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } else {
      const gcAmount = amount / 10;
      setUserCredits(prev => ({
        ...prev,
        sc: prev.sc - amount,
        gc: prev.gc + gcAmount
      }));
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'System',
        text: `Exchanged ${amount} SC for ${gcAmount} GC! 🔄`,
        type: 'exchange',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
    
    setShowExchange(false);
    setExchangeAmount('');
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <Card className="flex-grow flex flex-col">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500">
          <CardTitle className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6" />
              <span className="text-xl">ChAI Credits</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="px-3 py-1 bg-white/20 rounded">
                <Coins className="h-4 w-4 inline mr-1" />
                {userCredits.gc} GC
              </div>
              <div className="px-3 py-1 bg-white/20 rounded">
                <CreditCard className="h-4 w-4 inline mr-1" />
                {userCredits.sc} SC
              </div>
              <div className="px-3 py-1 bg-white/20 rounded">
                <Wallet className="h-4 w-4 inline mr-1" />
                {userCredits.eth} ETH
              </div>
            </div>
          </CardTitle>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                setShowBuyCredits(!showBuyCredits);
                setShowExchange(false);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white text-purple-500 rounded-md hover:bg-purple-50"
            >
              <CreditCard className="h-4 w-4" />
              Buy Credits
            </button>
            <button
              onClick={() => {
                setShowExchange(!showExchange);
                setShowBuyCredits(false);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white text-purple-500 rounded-md hover:bg-purple-50"
            >
              <Exchange className="h-4 w-4" />
              Exchange
            </button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow flex flex-col gap-4 overflow-y-auto">
          {showBuyCredits && (
            <Alert className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <AlertDescription>
                <div className="flex flex-col gap-3">
                  <div className="text-sm text-gray-600">
                    Buy Game Credits (GC) with ETH | Rate: 1 ETH = 1000 GC
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={cryptoAmount}
                      onChange={(e) => setCryptoAmount(e.target.value)}
                      placeholder="ETH Amount"
                      className="flex-grow p-2 border rounded"
                      min="0.01"
                      step="0.01"
                    />
                    <select
                      value={selectedCrypto}
                      onChange={(e) => setSelectedCrypto(e.target.value)}
                      className="p-2 border rounded bg-white"
                    >
                      <option value="ETH">ETH</option>
                      <option value="BNB">BNB</option>
                    </select>
                  </div>
                  <div className="text-sm text-gray-600">
                    You will receive: {cryptoAmount ? parseFloat(cryptoAmount) * 1000 : 0} GC
                  </div>
                  <button
                    onClick={handleBuyCredits}
                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                  >
                    Buy Credits
                  </button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {showExchange && (
            <Alert className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <AlertDescription>
                <div className="flex flex-col gap-3">
                  <div className="text-sm text-gray-600">
                    Exchange Credits | Rate: 1 GC = 10 SC
                  </div>
                  <select
                    value={exchangeType}
                    onChange={(e) => setExchangeType(e.target.value)}
                    className="p-2 border rounded bg-white"
                  >
                    <option value="GC_TO_SC">GC to SC</option>
                    <option value="SC_TO_GC">SC to GC</option>
                  </select>
                  <input
                    type="number"
                    value={exchangeAmount}
                    onChange={(e) => setExchangeAmount(e.target.value)}
                    placeholder={exchangeType === 'GC_TO_SC' ? 'GC Amount' : 'SC Amount'}
                    className="p-2 border rounded"
                    min="1"
                  />
                  <div className="text-sm text-gray-600">
                    You will receive: {
                      exchangeType === 'GC_TO_SC' 
                        ? `${exchangeAmount ? parseFloat(exchangeAmount) * 10 : 0} SC`
                        : `${exchangeAmount ? parseFloat(exchangeAmount) / 10 : 0} GC`
                    }
                  </div>
                  <button
                    onClick={handleExchange}
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                  >
                    Exchange Credits
                  </button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="flex-grow space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === 'You' 
                    ? 'bg-blue-500 text-white' 
                    : message.type === 'transaction'
                    ? 'bg-green-100 text-gray-800' 
                    : message.type === 'exchange'
                    ? 'bg-purple-100 text-gray-800'
                    : message.sender === 'ChAI'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="font-bold text-sm flex items-center gap-1">
                    {message.sender}
                    {message.sender === 'ChAI' && <Bot className="h-3 w-3" />}
                  </div>
                  <div>{message.text}</div>
                  <div className="text-xs mt-1 opacity-75">{message.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>

        <div className="p-4 border-t flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about credits or exchange rates..."
            className="flex-grow p-2 border rounded-md"
          />
          <button
            onClick={handleSendMessage}
            className="bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ChAIInterface;
