export const currentDTO = async (user) => {
    // Convertir el primer nombre a minúsculas
    user.first_name = user.first_name.toLowerCase();

    // Simular una operación asincrónica con un breve retraso
    await new Promise(resolve => setTimeout(resolve, 100));

    // Devolver el usuario modificado
    return user;
};