<?php
namespace Ejercicio11;
abstract class Persona {  //Cambio a clase abstracta
    protected string $nombre;
    protected string $apellidos;
    protected int $edad;

    public function __construct(string $nombre, string $apellidos, int $edad) {
        $this->nombre = $nombre;
        $this->apellidos = $apellidos;
        $this->edad = $edad;
    }

    public function getNombreCompleto(): string {
        return $this->nombre . ' ' . $this->apellidos;
    }

    public function getEdad(): int {
        return $this->edad;
    }

    public function setEdad(int $edad): void {
        if ($edad < 0) {
            throw new Exception("La edad no puede ser negativa.");
        }
        $this->edad = $edad;
    }

    public abstract static function toHtml(Persona $p): string;
    public function __toString(): string {
        return "Nombre Completo: " . $this->getNombreCompleto() . "\n" .
               "Edad: " . $this->getEdad() . " años\n";
    }
}
