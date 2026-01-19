/**
 * Modelos Matemáticos para Termodinámica - Fase 3
 * Ley Cero y Equilibrio Térmico
 */

export interface Material {
  name: string;
  specificHeat: number; // J/(kg·K)
}

export const Materials: Record<string, Material> = {
  WATER: { name: 'Agua', specificHeat: 4186 },
  IRON: { name: 'Hierro', specificHeat: 450 },
  COPPER: { name: 'Cobre', specificHeat: 385 },
  ALUMINUM: { name: 'Aluminio', specificHeat: 900 },
  GOLD: { name: 'Oro', specificHeat: 129 },
};

/**
 * Calcula el calor (Q) necesario para cambiar la temperatura de una masa (m)
 * Q = m * c * ΔT
 */
export const calculateHeat = (mass: number, specificHeat: number, tempChange: number): number => {
  return mass * specificHeat * tempChange;
};

/**
 * Calcula la temperatura final de equilibrio entre dos sustancias
 * Q_ganado + Q_perdido = 0
 * m1*c1*(Te - T1) + m2*c2*(Te - T2) = 0
 * Te = (m1*c1*T1 + m2*c2*T2) / (m1*c1 + m2*c2)
 */
export const calculateEquilibriumTemperature = (
  m1: number, c1: number, t1: number,
  m2: number, c2: number, t2: number
): number => {
  const numerator = (m1 * c1 * t1) + (m2 * c2 * t2);
  const denominator = (m1 * c1) + (m2 * c2);
  
  if (denominator === 0) return 0;
  return numerator / denominator;
};

/**
 * Ley Cero de la Termodinámica:
 * Si dos sistemas están en equilibrio térmico con un tercero, 
 * están en equilibrio térmico entre sí.
 */
export const checkThermalEquilibrium = (t1: number, t2: number, tolerance: number = 0.01): boolean => {
  return Math.abs(t1 - t2) <= tolerance;
};
