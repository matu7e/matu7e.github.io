// Evento de recarga de página
window.onload = resetForm;

// Evento de clic en el botón "Generar Carnet"
document.getElementById("generarCarnet").addEventListener("click", function () {
    resetForm();

    if (!validateForm()) {
        return;
    }

    generarCarnet();
});

// Agrega la validación al evento de clic en el botón "Generar Carnet"
function generarCarnet() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const dni = document.getElementById("dni").value;
    const escuela = document.getElementById("escuela").value;
    const opcion = document.getElementById("opcion").value;

    var imageInput = document.getElementById('imageInput');

    // Verificar si se seleccionó una imagen
    if (imageInput.files.length === 0) {
        alert('Por favor, seleccione una imagen.');
        return;
    }

    // Crear un objeto FileReader para leer el contenido de la imagen
    var reader = new FileReader();

    // Configurar la función de devolución de llamada cuando la imagen se cargue
    reader.onload = function (e) {
        // Crear un nuevo objeto jsPDF con el tamaño de A4
        const pdf = new jsPDF({
            format: 'a4', // Ancho y alto en milímetros
            unit: 'mm',
            orientation: 'landscape' // Establecer la orientación a horizontal
        });

        const rectFreWidth = 85; // 8.5 cm en milímetros
        const rectFreHeight = 55; // 5.5 cm en milímetros

        // Calcular la posición x para centrar horizontalmente
        const pageFreWidth = pdf.internal.pageSize.width;
        const x0 = (pageFreWidth - rectFreWidth) / 2;

        // Calcular la posición y para centrar verticalmente
        const pageFreHeight = pdf.internal.pageSize.height;
        const y0 = (pageFreHeight - rectFreHeight) / 2;

        pdf.setFillColor(40, 116, 166);

        // Dibujar el rectángulo dorso en el centro del PDF
        pdf.rect(x0 - 43, y0, rectFreWidth, rectFreHeight, 'F'); // 'F' indica que se debe rellenar el rectángulo

        // Obtener el tamaño del rectángulo dorso 
        const rectWidth = 85; // 8.5 cm en milímetros
        const rectHeight = 55; // 5.5 cm en milímetros

        // Calcular la posición x para centrar horizontalmente
        const pageWidth = pdf.internal.pageSize.width;
        const x = (pageWidth - rectWidth) / 2;

        // Calcular la posición y para centrar verticalmente
        const pageHeight = pdf.internal.pageSize.height;
        const y = (pageHeight - rectHeight) / 2;

        // Dibujar el rectángulo en el centro del PDF
        pdf.rect(x + 43, y, rectWidth, rectHeight);

        // Imprimir el texto "CARNET DE MIEMBRO" en el centro del rectángulo
        pdf.setFont("times", "bold");
        pdf.setFontSize(11);
        pdf.text(x + 53, y + 8, "CREDENCIAL DE PRACTICANTE", {
            align: "center"
        });
        pdf.setFontSize(15);
        pdf.text(x - 13.5, y - 50, "UNION MEDITERRANEA DE TAEKWONDO", {
            align: "center"
        });
        // Insertar una línea debajo del texto
        const lineGran = 0.5; // Ajusta el grosor de la línea según sea necesario
        pdf.setLineWidth(lineGran);
        pdf.line(x - 15, y + - 45, x + 98, y - 45); // Ajusta las coordenadas según sea necesario 

        pdf.setTextColor(150, 174, 182);
        pdf.text(x -10, y + - 10, "FRENTE", {
            align: "center"
        });
        
        pdf.text(x + 75, y - 10, "DORSO", {
            align: "center"
        });

        pdf.setTextColor(255);
        pdf.setFontSize(8);
        pdf.text(x -35, y + 42, "FEDERACION INTERNACIONAL DE TAEKWONDO", {
            align: "center"
        });

        // Insertar una línea debajo del texto
        const lineHeight = 0.5; // Ajusta el grosor de la línea según sea necesario
        pdf.setLineWidth(lineHeight);
        pdf.line(x - 40, y + 45, x + 38, y + 45); // Ajusta las coordenadas según sea necesario        

        // Establecer el tamaño de fuente a 10 puntos y negrita para "UNION MEDITERRANEA DE TAEKWONDO"
        pdf.setFont("times", "bold");
        pdf.setFontSize(10);
        pdf.text(x - 37, y + 8, "UNION MEDITERRANEA DE TAEKWONDO", {
            align: "center",
            fontSize: 5
        });
        pdf.setFontSize(8.5);
        pdf.text(x -15 , y + 17, "Cordoba", {
            align: "center"
        });

        pdf.setFontSize(8.5);
        pdf.text(x , y + 17, "Argentina", {
            align: "center"
        });
        
        pdf.setFontSize(7);
        pdf.text(x - 39, y + 50, "Cortesía - Integridad - Perseverancia - Autocontrol - Espíritu Indomable", {
            align: "center",
            fontSize: 5
        });

        // Restablecer el color del texto a negro (opcional, si deseas que el color predeterminado sea negro)
        pdf.setTextColor(0);

        pdf.setFontSize(8);
        pdf.text(x - 40, y + 130, "Prohibida la venta, imprecion, reproduccion, comercializacion y modificacion de este documento. © UNION MEDITERRANEA DE CORDOBA", {
            align: "center"
        });

        // Agregar la imagen principal al PDF
        pdf.addImage(e.target.result, 'JPEG', x + 100, y + 17.5, 22, 22);

        // Crear una nueva imagen para la marca de agua
        const marcaAguaImage = new Image();
        marcaAguaImage.src = 'marca.png'; // Asegúrate de que la ruta sea correcta

        // Crear nuevas imágenes para las imágenes adicionales
        const itf = new Image();
        itf.src = 'ITF.png'; // Asegúrate de que la ruta sea correcta

        const union = new Image();
        union.src = 'union.png'; // Asegúrate de que la ruta sea correcta

        const log1 = new Image();
        log1.src = 'log1.png'; // Asegúrate de que la ruta sea correcta

        const log2 = new Image();
        log2.src = 'log2.png'; // Asegúrate de que la ruta sea correcta

        const log3 = new Image();
        log3.src = 'log3.png'; // Asegúrate de que la ruta sea correcta

        const log4 = new Image();
        log4.src = 'log4.png'; // Asegúrate de que la ruta sea correcta

        const log5 = new Image();
        log5.src = 'log5.png'; // Asegúrate de que la ruta sea correcta

        // Configurar la función de devolución de llamada cuando la marca de agua se cargue
        marcaAguaImage.onload = function () {
            // Agregar la marca de agua al PDF
            pdf.addImage(marcaAguaImage, 'PNG', x + 64, y + 9, 35, 35);

            // Configurar la función de devolución de llamada cuando la imagen adicional 1 se cargue
            itf.onload = function () {
                // Configurar la función de devolución de llamada cuando la imagen adicional 2 se cargue
                union.onload = function () {
                    // Configurar la función de devolución de llamada cuando la imagen adicional 3 se cargue
                    log1.onload = function () {
                        // Configurar la función de devolución de llamada cuando la imagen adicional 4 se cargue
                        log2.onload = function () {
                            // Configurar la función de devolución de llamada cuando la imagen adicional 5 se cargue
                            log5.onload = function () {
                                // Agregar todas las imágenes adicionales al PDF
                                pdf.addImage(itf, 'PNG', x - 55, y - 70, 35, 35);
                                pdf.addImage(union, 'PNG', x + 105, y - 70, 35, 35);
                                pdf.addImage(log1, 'PNG', x + 17, y + 13, 22, 22);
                                pdf.addImage(log2, 'PNG', x , y + 20, 13, 13);
                                pdf.addImage(log3, 'PNG', x - 41, y + 13, 21, 21);
                                pdf.addImage(log4, 'PNG',x -15 , y + 20, 13, 13);
                                pdf.addImage(log5, 'PNG',x -55   , y + 50, 200, 90);

                                // Resto del contenido del carné...
                                // ...

                                // Establecer el tamaño de fuente a 6 puntos y negrita para "Nombre"
                                pdf.setFont("times", "bold");
                                pdf.setFontSize(10);
                                pdf.text(x + 48, y + 16, "Nombre: ", {
                                    align: "left"
                                });

                                // Restablecer el estilo de la fuente a normal
                                pdf.setFont("times", "normal");

                                // Imprimir el nombre sin negrita
                                pdf.text(x + 63, y + 16, nombre + " " + apellido, {
                                    align: "left"
                                });

                                // Imprimir el texto "Fecha de nacimiento: " seguido de la fecha de nacimiento del usuario
                                // Establecer el tamaño de fuente a 6 puntos y negrita para "F.N"
                                pdf.setFont("times", "bold");
                                pdf.setFontSize(10);
                                pdf.text(x + 48, y + 23, "F.N: ", {
                                    align: "center"
                                });

                                // Restablecer el estilo de la fuente a normal
                                pdf.setFont("times", "normal");

                                // Imprimir la fecha de nacimiento sin negrita
                                pdf.text(x + 57, y + 23, fechaNacimiento.toLocaleString(), {
                                    align: "center"
                                });

                                // Establecer el tamaño de fuente a 6 puntos y negrita para "DNI"
                                pdf.setFont("times", "bold");
                                pdf.setFontSize(10);
                                pdf.text(x + 48, y + 30, "DNI: ", {
                                    align: "center"
                                });

                                // Restablecer el estilo de la fuente a normal
                                pdf.setFont("times", "normal");

                                // Imprimir el número de DNI sin negrita
                                pdf.text(x + 57, y + 30, dni, {
                                    align: "center"
                                });

                                // Imprimir el texto "Escuela: " en negrita
                                pdf.setFont("times", "bold");
                                pdf.setFontSize(10);
                                pdf.text(x + 48, y + 37, "Escuela: ", {
                                    align: "left"
                                });

                                // Restablecer el estilo de la fuente a normal
                                pdf.setFont("times", "normal");

                                // Imprimir el nombre de la escuela sin negrita
                                pdf.text(x + 62, y + 37, escuela, {
                                    align: "left"
                                });

                                pdf.setFontSize(10);
                                // Imprimir el texto "Grado: " en negrita
                                pdf.setFont("times", "bold");

                                pdf.text(x + 48, y + 44, "Grado: ", {
                                    align: "left"
                                });

                                // Restablecer el estilo de la fuente a normal
                                pdf.setFont("times", "normal");

                                // Imprimir la opción sin negrita
                                pdf.text(x + 60, y + 44, opcion, {
                                    align: "left"
                                });

                                // Establecer el tamaño de fuente a 6 puntos para "Vigencia"
                                pdf.setFontSize(8);
                                pdf.setFont("times", 6);
                                pdf.text(x + 75, y + 51, "Vigencia 2024", {
                                    align: "center"
                                });

                                // Guardar el PDF como archivo
                                pdf.save('CarnetDigital.pdf');
                            };

                            // Leer el contenido de la imagen adicional 5 como una URL de datos (data URL)
                            log5.src = 'log5.png'; // Asegúrate de que la ruta sea correcta
                        };

                        // Leer el contenido de la imagen adicional 4 como una URL de datos (data URL)
                        log4.src = 'log4.png'; // Asegúrate de que la ruta sea correcta
                    };

                    // Leer el contenido de la imagen adicional 3 como una URL de datos (data URL)
                    log3.src = 'log3.png'; // Asegúrate de que la ruta sea correcta
                };

                // Leer el contenido de la imagen adicional 2 como una URL de datos (data URL)
                log2.src = 'log2.png'; // Asegúrate de que la ruta sea correcta
            };

            // Leer el contenido de la imagen adicional 1 como una URL de datos (data URL)
            log1.src = 'log1.png'; // Asegúrate de que la ruta sea correcta
        };
        marcaAguaImage.src = 'marca.png'; // Asegúrate de que la ruta sea correcta
    };

    // Leer el contenido de la imagen principal como una URL de datos (data URL)
    reader.readAsDataURL(imageInput.files[0]);
}
