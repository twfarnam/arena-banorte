export interface TriviaSet {
  startAt: Date
  questions: TriviaQuestion[]
}

export interface TriviaQuestion {
  prompt: string
  responses: string[]
  answer: number
}

export default [
  // Trivia 1 Miércoles 12pm
  {
    startAt: new Date(1665594000000),
    questions: [
      {
        prompt: '¿Cuál es el nombre de nuestro Producto?',
        responses: [
          'Hipoteca Mas x Menos',
          'Hipoteca Plus',
          'Hipoteca Fuerte',
        ],
        answer: 2,
      },
      {
        prompt: '¿Cuál es la tasa mínima?',
        responses: [
          '8.00%',
          '8.29%',
          '8.69%',
        ],
        answer: 2,
      }
    ],
  },
  // Trivia 2 Miércoles 5:00 pm 
  {
    startAt: new Date(1665612000000),
    questions: [
      {
        prompt: '¿Cuál es el nombre de nuestra plataforma online?',
        responses: [
          'Tiktoteca',
          'Kosmos',
          'Hipotecos',
        ],
        answer: 1,
      },
      {
        prompt: '¿Cuál es el aforo máximo que se puede otorgar para el destino Remodelación?',
        responses: [
          '45%',
          '35%',
          '30%',
        ],
        answer: 2,
      }
    ]
  },
  // Trivia 3 Miércoles 9:00 pm 
  {
    startAt: new Date(1665626400000),
    questions: [
      {
        prompt: '¿Cuál es el rango de edad permitida para un crédito hipotecario?',
        responses: [
          '21 a 69 años 11 meses',
          '24 a 69 años 11 meses',
          '25 a 69 años 11 meses',
        ],
        answer: 2,
      },
      {
        prompt: '¿Cuál es el plazo máximo en el destino de Liquidez?',
        responses: [
          'De 5 a 10 años',
          'De 5 a 20 años',
          'De 5 a 15 años',
        ],
        answer: 2,
      },
    ],
  },
  // Trivia 4 Jueves 10am
  {
    startAt: new Date(1665673200000),
    questions: [
      {
        prompt: '¿Cuál es el costo de la comisión de apertura para el destino de Mejora de Hipoteca?',
        responses: [
          '0.0%',
          '0.5%',
          '1.0%',
        ],
        answer: 0,
      },
      {
        prompt: '¿Cuál es la tasa Premium para Hipoteca Fuerte?',
        responses: [
          '8.29%',
          '8.00%',
          '8.69%',
        ],
        answer: 1,
      },
    ],
  },
  // Trivia 5 Jueves 3pm 
  {
    startAt: new Date(1665691200000),
    questions: [
      {
        prompt: '¿Cuál es el periodo mínimo que debes considerar para colocar una Mejora de Hipoteca, después de la Originación inicial, cuando el destino origen es Adquisición?',
        responses: [
          '24 meses',
          '12 meses',
          '48 meses',
        ],
        answer: 1,
      },
      {
        prompt: '¿Cuánto tiempo tiene de vigencia una autorización?',
        responses: [
          '120 días',
          '90 días',
          '60 días',
        ],
        answer: 1,
      }
    ],
  },
  // Trivia 6 Jueves 9:00 pm 
  {
    startAt: new Date(1665712800000),
    questions: [
      {
        prompt: '¿Cuáles son los decretos que pueden obtener en una precalificación?',
        responses: [
          'Aprobado y Rechazado',
          'Aprobado, Denegado Y Situación Critica',
          'Aprobado y Situación Critica',
        ],
        answer: 0,
      },
      {
        prompt: '¿Cuántos puntos logró obtener la selección mexicana durante el octagonal de la Concacaf 2022?',
        responses: [
          '24',
          '30',
          '28',
        ],
        answer: 2,
      },
    ],
  },
  // Trivia 7 Viernes 10am
  {
    startAt: new Date(1665759600000),
    questions: [
      {
        prompt: '¿Cuántas veces ha llegado México al quinto partido?',
        responses: [
          '2 veces',
          '5 veces',
          'Hemos sido campeones mundiales',
        ],
        answer: 0,
      },
      {
        prompt: '¿Quién es patrocinador oficial de la Selección Mexicana?',
        responses: [
          'Banorte',
          'Cemex',
          'El osito Bimbo',
        ],
        answer: 0,
      },
    ],
  },
  // Trivia 8 Viernes 1:00 pm
  {
    startAt: new Date(1665770400000),
    questions: [
      {
        prompt: '¿Cuántas copas ORO ha ganado México en la historia?',
        responses: [
          '11 copas',
          '8 copas',
          'El número que pensaste',
        ],
        answer: 0,
      },
      {
        prompt: '¿En qué años fue México sede del Mundial?',
        responses: [
          '1986 y 1970',
          '1968 y 1990',
          '1930 y 2002',
        ],
        answer: 0,
      },
    ],
  },
  // Trivia 9 Viernes 5:00 pm
  {
    startAt: new Date(1665781200000),
    questions: [
      {
        prompt: '¿De dónde es originario Checo Pérez?',
        responses: [
          'Guadalajara, Jalisco',
          'Aguascalientes, Aguascalientes',
          'Zacatecas, Zacatecas',
        ],
        answer: 0,
      },
      {
        prompt: '¿Qué motor utiliza la escudería de Checo Pérez?',
        responses: [
          'Honda',
          'Ferrari',
          'Kia',
        ],
        answer: 0,
      },
    ]
  }
] as TriviaSet[]
