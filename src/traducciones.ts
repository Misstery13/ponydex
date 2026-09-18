// La API devuelve todo en inglés; esta es la traducción de los tipos de ponies.

const KINDS: Record<string, string> = {
  Earth: 'Terrestre',
  Unicorn: 'Unicornio',
  Pegasus: 'Pegaso',
  Human: 'Humano',
  Crystal: 'Pony de cristal',
  Alicorn: 'Alicornio',
  Griffon: 'Grifo',
  Dragon: 'Dragón',
  Hippogriff: 'Hipogrifo',
  Seapony: 'Pony marino',
  Changeling: 'Changeling',
  Dog: 'Perro',
  Siren: 'Sirena',
  Rock: 'Roca',
  Yak: 'Yak',
  Umbrum: 'Umbrum',
  Doll: 'Muñeco',
  Donkey: 'Burro',
  Buffalo: 'Búfalo',
  Parrot: 'Loro',
  Phoenix: 'Fénix',
  Centaur: 'Centauro',
  Ram: 'Carnero',
  Draconequus: 'Draconequus',
  Ahuizotl: 'Ahuizotl',
  Hedgehog: 'Erizo',
  Various: 'Varios',
  Kirin: 'Kirin',
  Pony: 'Pony',
  Gremlin: 'Gremlin',
  Nyx: 'Nyx',
  Bull: 'Toro',
  Tree: 'Árbol',
  'Rubber chicken': 'Pollo de goma',
  'Various objects': 'Varios objetos',
  Clams: 'Almejas',
  Stick: 'Palo',
  Zebra: 'Cebra',
  Mule: 'Mula',
  Breezie: 'Breezie',
  'Sea serpent': 'Serpiente marina',
  Minotaur: 'Minotauro',
  Gargoyle: 'Gárgola',
  Cat: 'Gato',
  Rabbit: 'Conejo',
  Collie: 'Collie',
  'Persian cat': 'Gato persa',
  Alligator: 'Caimán',
  Owl: 'Búho',
  Bear: 'Oso',
  Tortoise: 'Tortuga',
  Raccoon: 'Mapache',
  'Three-headed dog': 'Perro de tres cabezas',
  Cow: 'Vaca',
  Apple: 'Manzana',
}

// Si aparece un tipo nuevo que no está en la lista, se muestra tal cual
export function traducirTipo(kind: string): string {
  return KINDS[kind] ?? kind
}

export function traducirSexo(sex: string): string {
  return sex.replace(/Female/g, 'Femenino').replace(/Male/g, 'Masculino')
}
