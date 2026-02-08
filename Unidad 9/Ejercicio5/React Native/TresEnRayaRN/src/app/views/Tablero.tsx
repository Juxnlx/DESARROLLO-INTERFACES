import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
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
    if (viewModel.estadoJuego === 'esperando') return '#7c3aed';
    if (viewModel.estadoJuego === 'finalizado') {
      if (viewModel.mensajeEstado.includes('ganado')) return '#10b981';
      if (viewModel.mensajeEstado.includes('perdido')) return '#ef4444';
      return '#f59e0b';
    }
    return viewModel.esMiTurno ? '#10b981' : '#f59e0b';
  };

  const obtenerInfoResultado = () => {
    const mensaje = viewModel.mensajeEstado;

    if (mensaje.includes('ganado')) return { titulo: '¡VICTORIA!', color: '#10b981', icono: '🏆' };
    if (mensaje.includes('perdido')) return { titulo: 'DERROTA', color: '#ef4444', icono: '😢' };
    if (mensaje.includes('Empate')) return { titulo: 'EMPATE', color: '#f59e0b', icono: '🤝' };
    if (mensaje.includes('desconectado')) return { titulo: 'DESCONECTADO', color: '#6b7280', icono: '👋' };
    return { titulo: 'FIN', color: '#6b7280', icono: '🎮' };
  };

  const renderModal = () => {
    if (viewModel.estadoJuego !== 'finalizado') return null;

    const info = obtenerInfoResultado();
    const puedeJugarDeNuevo = !viewModel.esperandoReset;

    return (
      <Modal transparent={true} animationType="fade" visible={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={[styles.modalIconoContainer, { backgroundColor: info.color + '20' }]}>
              <Text style={styles.modalIcono}>{info.icono}</Text>
            </View>

            <Text style={[styles.modalTitulo, { color: info.color }]}>{info.titulo}</Text>
            <Text style={styles.modalMensaje}>{viewModel.mensajeEstado}</Text>

            <View style={styles.tableroFinal}>
              <Text style={styles.tableroFinalTitulo}>Tablero Final</Text>
              {viewModel.tablero.celdas.map((fila, i) => (
                <View key={i} style={styles.filaFinal}>
                  {fila.map((valor, j) => (
                    <View key={j} style={styles.celdaFinal}>
                      <Text style={[styles.valorFinal, valor === 'X' ? styles.simboloX : styles.simboloO]}>
                        {valor || '-'}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>

            {puedeJugarDeNuevo ? (
              <TouchableOpacity
                style={[styles.botonJugarDeNuevo, { backgroundColor: info.color }]}
                onPress={() => viewModel.jugarDeNuevo()}
              >
                <Text style={styles.textoBotonJugar}>🔄 Jugar de Nuevo</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.esperandoContainer}>
                <Text style={styles.esperandoTexto}>⏳ Preparando nueva partida...</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fef3c7" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.titulo}>✨ Tres en Raya ✨</Text>

          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Tu símbolo</Text>
              <Text style={styles.infoValor}>{viewModel.miSimbolo || '...'}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Turno</Text>
              <Text style={styles.infoValor}>{viewModel.esMiTurno ? 'TÚ' : 'RIVAL'}</Text>
            </View>
          </View>

          <View style={[styles.estadoBanner, { backgroundColor: obtenerColorEstado() }]}>
            <Text style={styles.estadoTexto}>{viewModel.mensajeEstado}</Text>
          </View>
        </View>

        <View style={styles.tableroContainer}>
          {renderFila(0)}
          {renderFila(1)}
          {renderFila(2)}
        </View>

        {renderModal()}
      </SafeAreaView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fef3c7',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  titulo: {
    fontSize: 38,
    fontWeight: '900',
    color: '#7c3aed',
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
    backgroundColor: '#fef3c7',
    padding: 18,
    borderRadius: 20,
    minWidth: 130,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  infoLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: '700',
  },
  infoValor: {
    fontSize: 32,
    fontWeight: '900',
    color: '#7c3aed',
  },
  estadoBanner: {
    width: '100%',
    padding: 18,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  estadoTexto: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
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
    margin: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  celdaDisabled: {
    opacity: 0.6,
  },
  simbolo: {
    fontSize: 52,
    fontWeight: '900',
  },
  simboloX: {
    color: '#ef4444',
  },
  simboloO: {
    color: '#3b82f6',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 35,
    alignItems: 'center',
    width: '90%',
    maxWidth: 420,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  modalIconoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalIcono: {
    fontSize: 60,
  },
  modalTitulo: {
    fontSize: 44,
    fontWeight: '900',
    marginBottom: 12,
    letterSpacing: 2,
  },
  modalMensaje: {
    fontSize: 20,
    color: '#6b7280',
    marginBottom: 28,
    fontWeight: '600',
  },
  tableroFinal: {
    backgroundColor: '#fef3c7',
    padding: 18,
    borderRadius: 20,
    marginBottom: 25,
  },
  tableroFinalTitulo: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  filaFinal: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  celdaFinal: {
    width: 55,
    height: 55,
    backgroundColor: '#fff',
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  valorFinal: {
    fontSize: 30,
    fontWeight: '900',
  },
  botonJugarDeNuevo: {
    paddingVertical: 16,
    paddingHorizontal: 45,
    borderRadius: 20,
    minWidth: 220,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  textoBotonJugar: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
  esperandoContainer: {
    paddingVertical: 16,
    paddingHorizontal: 45,
    backgroundColor: '#f59e0b',
    borderRadius: 20,
    minWidth: 220,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  esperandoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default Tablero;