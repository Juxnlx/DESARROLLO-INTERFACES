import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { observer } from 'mobx-react-lite';
import { VMPartida } from '../../presenter/viewmodels/VMPartida';

const Tablero = observer(() => {
  const [viewModel] = useState(() => new VMPartida());

  useEffect(() => {
    viewModel.inicializar();

    return () => {
      viewModel.desconectar();
    };
  }, []);

  const handleCeldaPress = (fila: number, columna: number) => {
    viewModel.realizarMovimiento(fila, columna);
  };

  const renderCelda = (fila: number, columna: number) => {
    const valor = viewModel.tablero.celdas[fila][columna];
    const disabled = !viewModel.esMiTurno || valor !== '' || viewModel.estadoJuego !== 'jugando';

    return (
      <TouchableOpacity
        key={`${fila}-${columna}`}
        style={[
          styles.celda,
          disabled && styles.celdaDisabled
        ]}
        onPress={() => handleCeldaPress(fila, columna)}
        disabled={disabled}
      >
        <Text style={[
          styles.simbolo,
          valor === 'X' ? styles.simboloX : styles.simboloO
        ]}>
          {valor}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderFila = (fila: number) => {
    return (
      <View key={fila} style={styles.fila}>
        {renderCelda(fila, 0)}
        {renderCelda(fila, 1)}
        {renderCelda(fila, 2)}
      </View>
    );
  };

  const obtenerColorEstado = () => {
    if (viewModel.estadoJuego === 'esperando') return '#3498db';
    if (viewModel.estadoJuego === 'finalizado') {
      if (viewModel.mensajeEstado === '¡Has ganado!') return '#27ae60';
      if (viewModel.mensajeEstado === 'Has perdido') return '#e74c3c';
      return '#f39c12'; // Empate
    }
    return viewModel.esMiTurno ? '#27ae60' : '#e67e22';
  };

    const obtenerInfoResultado = () => {
      const mensaje = viewModel.mensajeEstado;
      
      // Verificar victoria
      if (mensaje.includes('ganado')) {
        return { titulo: '¡VICTORIA!', color: '#27ae60', icono: '🏆' };
      }
      
      // Verificar derrota
      if (mensaje.includes('perdido')) {
        return { titulo: 'DERROTA', color: '#e74c3c', icono: '😢' };
      }
      
      // Verificar empate
      if (mensaje.includes('Empate')) {
        return { titulo: 'EMPATE', color: '#f39c12', icono: '🤝' };
      }
      
      // Verificar desconexión
      if (mensaje.includes('desconectado')) {
        return { titulo: 'DESCONECTADO', color: '#95a5a6', icono: '👋' };
      }
      
      // Por defecto (no debería llegar aquí)
      return { titulo: 'FIN', color: '#95a5a6', icono: '🎮' };
    };

  const renderModal = () => {
    if (viewModel.estadoJuego !== 'finalizado') return null;

    const info = obtenerInfoResultado();

    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalIcono}>{info.icono}</Text>
            <Text style={[styles.modalTitulo, { color: info.color }]}>
              {info.titulo}
            </Text>
            <Text style={styles.modalMensaje}>{viewModel.mensajeEstado}</Text>

            <View style={styles.tableroFinal}>
              <Text style={styles.tableroFinalTitulo}>Tablero Final</Text>
              {viewModel.tablero.celdas.map((fila, i) => (
                <View key={i} style={styles.filaFinal}>
                  {fila.map((valor, j) => (
                    <View key={j} style={styles.celdaFinal}>
                      <Text style={[
                        styles.valorFinal,
                        valor === 'X' ? styles.simboloX : styles.simboloO
                      ]}>
                        {valor || '-'}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>

            <Text style={styles.modalInstruccion}>
              Cierra y vuelve a abrir la app para jugar de nuevo
            </Text>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
      
      <View style={styles.header}>
        <Text style={styles.titulo}>Tres en Raya</Text>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Tu símbolo</Text>
            <Text style={styles.infoValor}>
              {viewModel.miSimbolo || '...'}
            </Text>
          </View>
          
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Turno</Text>
            <Text style={styles.infoValor}>
              {viewModel.esMiTurno ? 'TÚ' : 'RIVAL'}
            </Text>
          </View>
        </View>

        <View style={[
          styles.estadoBanner,
          { backgroundColor: obtenerColorEstado() }
        ]}>
          <Text style={styles.estadoTexto}>
            {viewModel.mensajeEstado}
          </Text>
        </View>
      </View>

      <View style={styles.tableroContainer}>
        {renderFila(0)}
        {renderFila(1)}
        {renderFila(2)}
      </View>

      {renderModal()}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    letterSpacing: 2,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  infoBox: {
    alignItems: 'center',
    backgroundColor: '#34495e',
    padding: 15,
    borderRadius: 15,
    minWidth: 120,
    elevation: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: '#bdc3c7',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  infoValor: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  estadoBanner: {
    width: '100%',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 4,
  },
  estadoTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  tableroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fila: {
    flexDirection: 'row',
  },
  celda: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  celdaDisabled: {
    opacity: 0.7,
  },
  simbolo: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  simboloX: {
    color: '#e74c3c',
  },
  simboloO: {
    color: '#3498db',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
    width: '90%',
    maxWidth: 400,
    elevation: 10,
  },
  modalIcono: {
    fontSize: 80,
    marginBottom: 15,
  },
  modalTitulo: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMensaje: {
    fontSize: 20,
    color: '#7f8c8d',
    marginBottom: 25,
  },
  tableroFinal: {
    backgroundColor: '#ecf0f1',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  tableroFinalTitulo: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  filaFinal: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  celdaFinal: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#bdc3c7',
  },
  valorFinal: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  modalInstruccion: {
    fontSize: 14,
    color: '#95a5a6',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default Tablero;