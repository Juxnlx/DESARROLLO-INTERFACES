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

/**
 * Componente principal del tablero de Tres en Raya.
 * Utiliza MobX para observar cambios en el ViewModel y actualizar la UI automáticamente.
 * 
 * Este componente gestiona:
 * - La visualización del tablero 3x3
 * - La información del jugador (símbolo y turno)
 * - El estado de la partida (esperando, jugando, finalizado)
 * - El modal de resultado final
 * - La interacción con las celdas del tablero
 */
const Tablero = observer(() => {
  // Crea una instancia del ViewModel y la mantiene durante toda la vida del componente
  const [viewModel] = useState(() => new VMPartida());

  /**
   * Hook de efecto que se ejecuta al montar el componente.
   * Inicializa la conexión con el servidor SignalR.
   * 
   * La función de limpieza (return) se ejecuta al desmontar el componente
   * para desconectar correctamente del servidor.
   */
  useEffect(() => {
    viewModel.inicializar();

    return () => {
      viewModel.desconectar();
    };
  }, []);

  /**
   * Maneja el evento de presionar una celda del tablero.
   * Delega la lógica de validación y envío al ViewModel.
   * 
   * @param {number} fila - Índice de la fila (0-2)
   * @param {number} columna - Índice de la columna (0-2)
   */
  const handleCeldaPress = (fila: number, columna: number) => {
    viewModel.realizarMovimiento(fila, columna);
  };

  /**
   * Renderiza una celda individual del tablero.
   * Aplica estilos diferentes según el turno para indicar visualmente
   * cuándo el jugador puede o no interactuar con el tablero.
   * 
   * @param {number} fila - Índice de la fila (0-2)
   * @param {number} columna - Índice de la columna (0-2)
   * @returns {JSX.Element} Componente TouchableOpacity con el símbolo (X, O o vacío)
   */
  const renderCelda = (fila: number, columna: number) => {
    const valor = viewModel.tablero.celdas[fila][columna];
    // La celda está deshabilitada si no es mi turno, ya tiene un símbolo, o la partida terminó
    const disabled = !viewModel.esMiTurno || valor !== '' || viewModel.estadoJuego !== 'jugando';
    
    // Determinar si la celda debe verse "bloqueada" visualmente (cuando no es mi turno)
    const celdaBloqueada = viewModel.estadoJuego === 'jugando' && !viewModel.esMiTurno;

    return (
      <TouchableOpacity
        key={`${fila}-${columna}`}
        style={[
          styles.celda,
          disabled && styles.celdaDisabled,
          // Si no es mi turno, aplicar estilo bloqueado (fondo gris)
          celdaBloqueada && styles.celdaBloqueada
        ]}
        onPress={() => handleCeldaPress(fila, columna)}
        disabled={disabled}
      >
        <Text style={[
          styles.simbolo,
          valor === 'X' ? styles.simboloX : styles.simboloO,
          // Si no es mi turno, hacer los símbolos más tenues
          celdaBloqueada && styles.simboloBloqueado
        ]}>
          {valor}
        </Text>
      </TouchableOpacity>
    );
  };

  /**
   * Renderiza una fila completa del tablero (3 celdas).
   * 
   * @param {number} fila - Índice de la fila (0-2)
   * @returns {JSX.Element} Vista horizontal con 3 celdas
   */
  const renderFila = (fila: number) => {
    return (
      <View key={fila} style={styles.fila}>
        {renderCelda(fila, 0)}
        {renderCelda(fila, 1)}
        {renderCelda(fila, 2)}
      </View>
    );
  };

  /**
   * Obtiene el color de fondo del banner de estado según el estado actual del juego.
   * 
   * @returns {string} Código hexadecimal del color
   */
  const obtenerColorEstado = () => {
    if (viewModel.estadoJuego === 'esperando') return '#7c3aed'; // Morado
    if (viewModel.estadoJuego === 'finalizado') {
      if (viewModel.mensajeEstado.includes('ganado')) return '#10b981'; // Verde
      if (viewModel.mensajeEstado.includes('perdido')) return '#ef4444'; // Rojo
      return '#f59e0b'; // Naranja para empate
    }
    // Durante el juego: verde si es mi turno, naranja si es del rival
    return viewModel.esMiTurno ? '#10b981' : '#f59e0b';
  };

  /**
   * Obtiene la información visual para mostrar en el modal de resultado.
   * Incluye el título, color e icono según el resultado de la partida.
   * 
   * @returns {Object} Objeto con propiedades titulo, color e icono
   */
  const obtenerInfoResultado = () => {
    const mensaje = viewModel.mensajeEstado;
    
    // Verifica el resultado usando .includes() para detectar el texto clave
    if (mensaje.includes('ganado')) {
      return { 
        titulo: '¡VICTORIA!', 
        color: '#10b981', 
        icono: '🏆' 
      };
    }
    
    if (mensaje.includes('perdido')) {
      return { 
        titulo: 'DERROTA', 
        color: '#ef4444', 
        icono: '😢' 
      };
    }
    
    if (mensaje.includes('Empate')) {
      return { 
        titulo: 'EMPATE', 
        color: '#f59e0b', 
        icono: '🤝' 
      };
    }
    
    if (mensaje.includes('desconectado')) {
      return { 
        titulo: 'DESCONECTADO', 
        color: '#6b7280', 
        icono: '👋' 
      };
    }
    
    // Caso por defecto (no debería ocurrir)
    return { 
      titulo: 'FIN', 
      color: '#6b7280', 
      icono: '🎮' 
    };
  };

  /**
   * Renderiza el modal que se muestra cuando la partida termina.
   * Muestra el resultado, el tablero final y el botón para jugar de nuevo.
   * 
   * @returns {JSX.Element | null} Modal con el resultado o null si la partida no ha terminado
   */
  const renderModal = () => {
    // No mostrar el modal si la partida no ha terminado
    if (viewModel.estadoJuego !== 'finalizado') return null;

    const info = obtenerInfoResultado();
    // Solo se puede jugar de nuevo si el servidor ya reseteó el estado
    const puedeJugarDeNuevo = !viewModel.esperandoReset;

    return (
      <Modal
        transparent={true}
        animationType="fade"
        visible={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Contenedor circular con el icono del resultado */}
            <View style={[styles.modalIconoContainer, { backgroundColor: info.color + '20' }]}>
              <Text style={styles.modalIcono}>{info.icono}</Text>
            </View>
            
            {/* Título del resultado (VICTORIA, DERROTA, EMPATE) */}
            <Text style={[styles.modalTitulo, { color: info.color }]}>
              {info.titulo}
            </Text>
            
            {/* Mensaje detallado del resultado */}
            <Text style={styles.modalMensaje}>{viewModel.mensajeEstado}</Text>

            {/* Tablero final mostrando el estado al terminar la partida */}
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
                        {/* Muestra un guion si la celda está vacía */}
                        {valor || '-'}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>

            {/* Botón condicional: "Jugar de Nuevo" o "Preparando..." */}
            {puedeJugarDeNuevo ? (
              <TouchableOpacity
                style={[styles.botonJugarDeNuevo, { backgroundColor: info.color }]}
                onPress={() => viewModel.jugarDeNuevo()}
              >
                <Text style={styles.textoBotonJugar}>🔄 Jugar de Nuevo</Text>
              </TouchableOpacity>
            ) : (
              // Muestra este mensaje mientras el servidor resetea el estado (3 segundos)
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
      {/* Barra de estado del sistema (hora, batería, etc.) */}
      <StatusBar barStyle="dark-content" backgroundColor="#fef3c7" />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Cabecera con título, información del jugador y estado */}
        <View style={styles.header}>
          <Text style={styles.titulo}>✨ Tres en Raya ✨</Text>
          
          {/* Contenedor con información del símbolo y turno */}
          <View style={styles.infoContainer}>
            {/* Tarjeta con el símbolo del jugador (X u O) */}
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Tu símbolo</Text>
              <Text style={styles.infoValor}>
                {viewModel.miSimbolo || '...'}
              </Text>
            </View>
            
            {/* Tarjeta indicando de quién es el turno */}
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Turno</Text>
              <Text style={styles.infoValor}>
                {viewModel.esMiTurno ? 'TÚ' : 'RIVAL'}
              </Text>
            </View>
          </View>

          {/* Banner con el mensaje de estado (color dinámico según el estado) */}
          <View style={[
            styles.estadoBanner,
            { backgroundColor: obtenerColorEstado() }
          ]}>
            <Text style={styles.estadoTexto}>
              {viewModel.mensajeEstado}
            </Text>
          </View>
        </View>

        {/* Contenedor principal del tablero 3x3 */}
        <View style={styles.tableroContainer}>
          {renderFila(0)}
          {renderFila(1)}
          {renderFila(2)}
        </View>

        {/* Modal de resultado (solo visible cuando la partida termina) */}
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
  // Estilo para celdas cuando NO es tu turno (bloqueadas visualmente)
  celdaBloqueada: {
    backgroundColor: '#e5e7eb', // Fondo gris claro
    shadowOpacity: 0.1, // Sombra más suave
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
  // Estilo para símbolos cuando NO es tu turno (más tenues)
  simboloBloqueado: {
    opacity: 0.4, // Símbolos muy tenues
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