console.log("La programación orientada a objetos es un conjunto de técnicas que utiliza objetos");
console.log("como el principio central de la organización de un programa.");
console.log("El encapsulamiento consiste en definir tipos abstractos de datos, con sus atributos y métodos");
console.log("separando la interfaz de la implementación.");
console.log("En la definición de un T.A.D. se suele hacer una distinción entre código publico y privado");
console.log("no obstante, JS todavía no hace distinción aunque es común usar una barra baja al principio del identificador");
console.log("de una propiedad o atributo para indicar que es privado.");

console.log();

console.log("Los métodos son propiedades que juegan el papel de una función dentro de un objeto e.g. ver código fuente");

let rabbit = {};
rabbit.speak = function(line) {
	console.log(`The rabbit says ${line}`);
};

rabbit.speak("I am alive.");

console.log();

console.log("A continuación vamos a ver un uso del keyword this que consiste en referenciar mediante dicha keyword,");
console.log("al atributo de un objeto e.g. ver código fuente");

function speak(word) {
	console.log(`The ${this.type} rabbit says ${word}`);
};

let whiteRabbit = {type: 'white', speak};
let blackRabbit = {type: 'black', speak};

whiteRabbit.speak("hello");
blackRabbit.speak("bye");

console.log();

console.log("El método call, es una función predefinida del lenguaje que permite invocar una función definida por el usuario,");
console.log("pasándole los argumentos que requiera e.g. ver código fuente");

speak.call(whiteRabbit, "hello"); //Si no se le pasa un objeto con el atributo al que hace referencia this, imprime undefined

console.log();

console.log("Cuando la palabra clave this no está dentro de un objeto definido por el usuario, this hace referencia al objeto del");
console.log("contexto global, que en los navegadores es window e.g. ver código fuente");

console.log(this === window);

function test() {
	console.log(this === window);
}

test();

console.log("Como hemos visto más arriba, si se usa this dentro de un método de un objeto definido por el usuario, entonces");
console.log("this hace referencia a dicho objeto. Además mediante el método call se puede modificar el valor de this en");
console.log("tiempo de ejecución (dinámicamente).");

console.log();

console.log("A continuación, veremos un ejemplo de uso de this en una función arrow, que limita el alcance del valor de this");
console.log("al contexto donde ha sido definida la función arrow e.g. ver código fuente");

function normalize() {
	console.log(this.coords.map(n => n / this.length));
}

normalize.call({coords: [0, 2, 3], length: 5});

console.log("De haber escrito la función que se le pasa como argumento al método map mediante la palabra reservada function");
console.log("el código no funcionaría.")

console.log();

console.log("Un prototipo es un objeto del que otros objetos heredan propiedades. Cuando se solicita una propiedad a un objeto");
console.log("y dicho objeto no tiene dicha propiedad, esta se buscará en el prototipo del objeto, luego en el prototipo del prototipo,");
console.log("y así sucesivamente. Las relaciones de prototipo de los objetos JS forman una estructura arborescente y en la raíz se")
console.log("encuentra el objeto padre: Object.prototype. E.g. ver código fuente");

let empty = {};
/*toString() muestra [object type] normalmente para objetos comunes muestra [object Object] para datos primitivos 
 *o atributos de un objeto muestra el valor convertido en un string. 
 */
console.log(empty.toString);
console.log(empty.toString());

/*Object.getPrototypeOf() retorna el prototipo de un objeto. La sentencia de abajo ilustra que el objeto vacío tiene el mismo prototipo
 *que el objeto padre.
 */
console.log(Object.getPrototypeOf({}) == Object.prototype);
console.log(Object.getPrototypeOf(Object.prototype)); //Retorna null porque es el objeto raíz

console.log();

console.log("Algunos objetos no tienen Object.prototype directamente como su prototipo raíz, sino que tienen otro objeto");
console.log("que proporciona un conjunto diferente de propiedades. Por ejemplo, las funciones derivan de Function.prototype");
console.log("y los arrays de Array.prototype e.g. ver código fuente");

console.log(Object.getPrototypeOf(Math.min) == Function.prototype);
console.log(Object.getPrototypeOf([]) == Array.prototype);

console.log();

console.log("Se puede usar Object.create para crear un objeto con un prototipo específico e.g.");

let protoRabbit = {
	hablar(line) { //Forma abreviada de definir un método en un objeto
		console.log(`The ${this.type} rabbit says ${line}`);
	}
};
/*El objeto protoRabbit actúa como contenedor de las propiedades que comparten todos los objetos creados
 *con Object.create(protoRabbit)
 */
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "Killer";
killerRabbit.hablar("Everybody will die");

console.log();

console.log("Una clase define la forma de un tipo de objeto: qué métodos y propiedades tiene. Tal objeto se llama");
console.log("instancia de la clase.");
console.log("Los prototipos son útiles para definir propiedades para las cuales todas las instancias de una clase");
console.log("comparten el mismo valor, como los métodos.");
console.log("Las propiedades que difieren por instancia, como la propiedad del tipo de conejo, deben almacenarse");
console.log("directamente en los propios objetos.");
console.log("Para crear una instancia de una clase determinada, se debe crear un objeto que se derive del prototipo adecuado,");
console.log("pero también asegurarse de que tenga las propiedades que se supone que tienen las instancias de esta clase.");
console.log("Esto es lo que hace una función constructora e.g.");

function makeRabbit(type) {
	let rabbit = Object.create(protoRabbit);
	rabbit.type = type;
	return rabbit;
};

let strangeRabbit = makeRabbit("strange");
console.log(strangeRabbit);
strangeRabbit.hablar("que extraño");
console.log(Object.getPrototypeOf(strangeRabbit));

console.log();

console.log("Una forma más fácil de definir un constructor, es colocando la palabra reservada new frente a una llamada a una función e.g.");

function Rabbit(type) {
	this.type = type;
};

Rabbit.prototype.speak = function(word) {
	console.log(`The ${this.type} rabbit says ${word}`);
};//Añade un método personalizado al repertorio de métodos que ofrece el prototipo de función por defecto

let pinkRabbit = new Rabbit("pink");
pinkRabbit.speak("I see everything pink");

console.log("Todas las funciones tienen una propiedad llamada prototipo, que por defecto contiene un objeto simple y vacío");
console.log("que deriva de Object.prototype, y que puede ser sobreescrito, o se le pueden añadir nuevas propiedades");
console.log("como lo hace el ejemplo de arriba (ver código fuente)");

console.log();

console.log("Es importante comprender la distinción entre la forma en que un prototipo está asociado con un constructor");
console.log("(a través de su propiedad prototype) y la forma en que los objetos tienen un prototipo (que se puede");
console.log("comprobar con Object.getPrototypeOf()). El prototipo real de un constructor es Funcion.prototype.");
console.log("Su propiedad prototype contiene el prototipo utilizado para las instancias creadas a través de él.");

console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);
console.log(Object.getPrototypeOf(pinkRabbit) == Rabbit.prototype);

console.log();

console.log("Entonces las clases de JS son funciones constructoras con una propiedad prototype e.g.");

class Conejo {
	constructor(type) {
		this.type = type;
	}
	hablar(line) {
		console.log(`The ${this.type} conejo says ${line}`);
	}
}

let neoConejo = new Conejo("neo");
neoConejo.hablar("soy anglosajón");
let mutante = new Conejo("mutante");

console.log("La plabra clave class permite definir un constructor, que define atributos, y un conjunto de métodos.");
console.log("La palabra clave constructor, proporciona la función constructora real, que se vincula al identificador de la clase.");
console.log("Una clase se puede usar tanto en enunciados como en expresiones. Cuando se usa en expresiones se omite el identificador");
console.log("de la clase, lo que permite definir una clase anónima e.g.");

let obj = new class {getWord() {return "Hello";}};
console.log(obj.getWord());

console.log();

console.log("Cuando se agrega una propiedad a un objeto, esté o no presente en el prototipo, la propiedad se agrega al objeto per se e.g.");

Conejo.prototype.teeth = "small";
console.log(neoConejo.teeth);
neoConejo.teeth = "long, sharp, and bloody";
console.log(neoConejo.teeth);
console.log(mutante.teeth);
console.log(Conejo.prototype.teeth);

console.log("La anulación de propiedades de un prototipo puede ser útil para expresar propiedades excepcionales en instancias");
console.log("de una clase de objetos más genérica. También se puede para redefinir los métodos estándar de un prototipo");
console.log("como por ejemplo toString e.g.");

console.log(Array.prototype.toString == Object.prototype.toString);
console.log([1,2].toString());
console.log(Object.prototype.toString.call([1,2]));

console.log();

console.log("En JS la palabra 'map', tiene dos significados. Por un lado, es una operación que transforma una estructura");
console.log("de datos al aplicar una función a sus elementos. Por otro lado, es una estructura de datos per se, que asocia");
console.log("una llave con un valor e.g.");

console.log([1,2,3,4].map(n => n**2));

let ages = {
	Boris: 39,
	Liang: 22,
	Julia: 62
};

console.log(ages["Julia"]);
console.log("Jack" in ages);
console.log("toString" in ages);

console.log("Usar objetos planos '{}' para definir maps como estructura de datos no es aconsejable, ya que");
console.log("al derivarse de Object.prototype incluye los métodos estándar y pasan a considerarse elementos de nuestra estructura");
console.log("algo que se considera ineficiente (despilfarro de memoria). Hay formas de evitarlo e.g.");

let mapa = Object.create(null);
console.log(Object.getPrototypeOf(mapa));
mapa["Ismael"] = 31;
console.log(mapa);

let edades = new Map();
console.log(edades);
edades.set('Boris', 39);
edades.set('Julia', 62);
console.log(`Julia is ${edades.get("Julia")}`);
console.log(edades.has('Jack'));
console.log(edades.has('Boris'));
console.log(edades.has('toString'));

console.log("Object.keys devuelve solo las llaves de un objeto, no las del prototipo.");
console.log(Object.keys({ismael: 31}));

console.log("'hasOwnProperty' es una alternativa más robusta al operador 'in'. Ignora el prototipo del objeto.");

console.log({x: 1}.hasOwnProperty("x"));
console.log({x: 1}.hasOwnProperty("toString"));

console.log();

console.log("Algunos de los prototipos estándar definen su propia versión de toString para que puedan crear una cadena");
console.log("que contenga información más útil que '[object Object]'. También se puede modificar manualmente e.g.");

console.log(Conejo.prototype.toString());

Conejo.prototype.toString = function() {
	return `a ${this.type} rabbit`;
}

//console.log(Conejo.prototype.toString());
console.log(String(neoConejo));
console.log(String(mutante));

console.log("Este ejemplo ilustra el concepto de polimorfismo. Objetos diferentes pueden usar un código común.");

console.log();

console.log("Los identificadores de propiedades no siempre son cadenas. A veces son símbolos, que a diferencia de las cadenas,");
console.log("son únicos. No se puede crear el mismo símbolo dos veces. Estos se crean con la función Symbol e.g.");

let sym = Symbol("name");
console.log(sym == Symbol("name"));
Conejo.prototype[sym] = 55;
console.log(neoConejo[sym]);

console.log("Los símbolos son útiles para definir interfaces, y no interfieren en otras propiedades, sea cual sea su nombre e.g.");

const toStringSymbol = Symbol("toString");
Array.prototype[toStringSymbol] = function() {
	return `${this.length} cm if blue yarn`;
};

console.log([1,2].toString());
console.log([1,2,3,4][toStringSymbol]());

console.log("Es posible incluir propiedades de símbolos en expresiones de objetos y clases usando corchetes alrededor del nombre");
console.log("de la propiedad. Esto previene el conflicto de identificadores iguales e.g.");

let stringObject = {
	[toStringSymbol]() {
		return "a jute rope";
	}
};

console.log(stringObject[toStringSymbol]());

console.log();

console.log("La estructura for/of siempre espera un objeto iterable. 'Symbol.iterator' es un método que proporciona un");
console.log("iterador. Este iterador posee un método next, que devuelve el siguiente resultado, que es un objeto que contiene");
console.log("las propiedades value y done e.g.");

let okIterator = "ok"[Symbol.iterator]();
console.log(okIterator.next());
console.log(okIterator.next());
console.log(okIterator.next());

console.log("A continuación vamos a crear una clase matriz, que emule un array bidimensional e.g.");

class Matrix {
  //element es un parámetro que por defecto tiene una función que asigna undefined en cada posición x, y como elementos de la matriz,
  //a no ser que se le pase como argumento otra función.
  constructor(width, height, element = (x, y) => undefined) {
    this.width = width;
    this.height = height;
    this.content = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.content[y * width + x] = element(x, y);
      }
    }
  }

  get(x, y) {
    return this.content[y * this.width + x];
  }
  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }
}

let matrix = new Matrix(3, 3, (x, y) => `${x},${y}`);
console.log(matrix.content);

console.log("Cuando se recorre una matriz, interesa conocer la posición de los elementos, como los elementos per se");
console.log("por lo que el iterador producirá objetos con propiedades x, y, value e.g.");

class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }

  next() {
    if (this.y == this.matrix.height) return {done: true};

    let value = {x: this.x,
                 y: this.y,
                 value: this.matrix.get(this.x, this.y)};
    this.x++;
    if (this.x == this.matrix.width) {
      this.x = 0;
      this.y++;
    }
    return {value, done: false};
  }
}

let iterarMatriz = new MatrixIterator(matrix);
console.log(iterarMatriz.next());
console.log(iterarMatriz.next());
console.log(iterarMatriz.next());
console.log(iterarMatriz.next());

console.log("Llegados a este punto, para hacer que la clase Matrix sea iterable, hay que hacer esta configuración i.e.");

Matrix.prototype[Symbol.iterator] = function() {
	return new MatrixIterator(this);
};

let mat = new Matrix(2, 2, (x, y) => `value ${x},${y}`);
for (let {x, y, value} of mat) console.log(x, y, value);

console.log();

console.log("Los getters son propiedades a las que se accede directamente, que ocultan una llamada a un método o función. Se");
console.log("definen escribiendo 'get' delante del nombre del método en una expresión de objeto o declaración de clase e.g.");

let varyingSize = {
	get size() {
		return Math.floor(Math.random() * 100);
	}
};

console.log(varyingSize.size);
console.log(varyingSize.size);

console.log("Los setters funcionan de una forma similar e.g.");

class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }
  //Los métodos declarados con la palabra clave static, complementan al constructor de la clase e.g. se puede crear una instancia
  //de la clase llamando a un método static como se muestra abajo. Sin embargo, la instancias de la clase per se, no pueden usar 
  //estos métodos.
  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit); //Llamada a getter
temp.fahrenheit = 86; //Llamada a setter
console.log(temp.celsius);
let T = Temperature.fromFahrenheit(100);
console.log(T.celsius);

console.log();

console.log("El sistema de prototipos de JS permite crear una nueva clase a partir de otra, con nuevas definiciones para");
console.log("algunas de sus propiedades y métodos. En términos de P.O.O. esto se llama herencia e.g.");

class SymmetricMatrix extends Matrix {
  constructor(size, element = (x, y) => undefined) {
    super(size, size, (x, y) => {
      //Estas condiciones permiten crear una matriz simétrica, en el bucle del constructor de la superclase
      if (x < y) return element(y, x); //Llama a la función element del parámetro de la subclase, y que se le pasa más abajo como argumento.
      else return element(x, y);
    });
  }

  //Aunque se modifica o establezca un valor, este método se ocupa de que la matriz siga siendo simétrica, duplicando el valor
  //en la posición correspondiente, cuando no se encuentra en la diagonal
  set(x, y, value) {
    super.set(x, y, value);
    if (x != y) {
      super.set(y, x, value);
    }
  }
}

let symMat = new SymmetricMatrix(3, (x, y) => `${x},${y}`);
console.log(symMat.get(1,2)); //Si x < y entonces retorna y,x
symMat.set(2, 0, 10);
console.log(symMat.get(2,0));
console.log(symMat.get(0,2));

console.log("La palabra clave 'extends' indica que la clase no debe basarse directamente en Object.prototype si no en la clase");
console.log("que se indica, que en términos de herencia, se denomina superclase. Por otro lado, la palabra clave super, proporciona");
console.log("una forma de llamar a los métodos tal como se definieron en la superclase.");

console.log();

console.log("Finalmente, para saber si un objeto deriva de una clase específica, usamos el operador binario 'instanceof' e.g.");

console.log(new SymmetricMatrix(2) instanceof SymmetricMatrix);
console.log(new SymmetricMatrix(2) instanceof Matrix);
console.log(new Matrix(2,2) instanceof SymmetricMatrix);
console.log([1] instanceof Array);

console.log("Casi todos los objetos son instancias de Object");

console.log();

console.log("A vector type");
console.log("Se refiere al vector de las matemáticas...");

class Vec {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	plus(vector) {
		return new Vec((this.x + vector.x), (this.y + vector.y));
	}

	minus(vector) {
		return new Vec((this.x - vector.x), (this.y - vector.y));
	}

	get length() {
		return Math.sqrt(this.x**2 + this.y**2);
	}
}

/*Vec.prototype.plus = function(vector) {
	return new Vec((this.x + vector.x), (this.y + vector.y));
};

Vec.prototype.minus = function(vector) {
	return new Vec((this.x - vector.x), (this.y - vector.y));
};

Vec.prototype.length = function() {
	return Math.sqrt(this.x**2 + this.y**2);
}*/

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
console.log(new Vec(3, 4).length);

console.log();

console.log("Groups");

console.log("El entorno estándar de JS proporciona otra estructura de datos denominada Set. Set contiene una colección de valores pero");
console.log("a diferencia de MAP estos valores no son asociados con claves. Los valores de un Set son únicos y a diferencia de Array");
console.log("solo pueden ser agregados una vez e.g.");

let mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(3);

console.log(mySet.has(1));
console.log(mySet.has(4));
console.log(mySet.size);

for (let item of mySet) console.log(item);

mySet.delete(3);
console.log(mySet.has(3));

class Group {
	constructor() {
		this.content = [];
	}

	add(element) {
		if (this.content.indexOf(element) == -1) this.content.push(element);
	}

	delete(element) {
		if (this.content.indexOf(element) != -1) this.content.splice(this.content.indexOf(element), 1);
	}

	has(element) {
		return this.content.includes(element);
	}

	static from(values) {
		let outPut = new Group();
		for (let value of values) outPut.add(value)
		return outPut;
	}
}

let group = Group.from([10, 20]);
console.log(group.content);
console.log(group.has(10));
console.log(group.has(30));
group.add(10);
group.delete(10);
console.log(group.has(10));
console.log("Solution: https://eloquentjavascript.net/code/#6.2");

console.log();

console.log("Iterable groups");

class GroupIterator {
	constructor(group) {
		this.index = 0;
		this.group = group;
	}

	next() {
		if (this.index == this.group.content.length) return {done: true};

		let value = this.group.content[this.index];

		++this.index;

		return {value, done: false};
	}
}

Group.prototype[Symbol.iterator] = function() {
	return new GroupIterator(this);
};

for (let value of Group.from(['a', 'b', 'c'])) console.log(value);

console.log("Solution: https://eloquentjavascript.net/code/#6.3");

console.log();

console.log("Borrowing a method");

//Para usar el método hasOwnProperty de un objeto que tiene una propiedad que también se llama hasOwnProperty, hay que llamar
//al método de una forma diferente

let map = {one: true, two: true, hasOwnProperty: true};

//map.hasOwnProperty("one"); Da error

//Por lo tanto

console.log(Object.prototype.hasOwnProperty.call(map, "one"));
console.log(map.hasOwnProperty);
