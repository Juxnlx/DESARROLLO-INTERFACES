namespace TresEnRayaSignalR.Entities
{
    public class Movimiento
    {
        public int[] Posicion { get; set; } = new int[2];
        public string Simbolo { get; set; } = string.Empty;

        public Movimiento(int[] posicion, string simbolo)
        {
            Posicion = posicion;
            Simbolo = simbolo;
        }

        public Movimiento() { }
    }
}