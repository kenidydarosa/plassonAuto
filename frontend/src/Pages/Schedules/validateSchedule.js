export const validateSchedule = (userDB, veicule, dateStart, dateEnd, currentSchedule, schedulesDB) => {
  // Converte as strings de data de início e fim para objetos Date
  const newStart = new Date(dateStart);
  const newEnd = new Date(dateEnd);

  // Percorre todas as reservas no banco de dados
  for (const item of schedulesDB) {
    // Verifica se a reserva atual é para o mesmo veículo
    if (item.veicule_id === veicule && item.status === 'Ativa') {
      const existingStart = new Date(item.start);
      const existingEnd = new Date(item.end);

      // Verifica se o usuário é o dono da reserva atual
      if (item.user_id === userDB.id || userDB.name === 'Admin') {
        // Permite que o usuário edite a reserva dentro do intervalo que ele já possui
        if (newStart >= existingStart && newEnd <= existingEnd) {
          // Se o horário está dentro do intervalo existente, a reserva é válida
          continue;
        }
      }

      // Se não for o dono da reserva, verifica conflitos de horário
      if (
        currentSchedule.id !== item.id &&
        ((newStart < existingEnd && newStart >= existingStart) || // Novo registro começa no intervalo da reserva existente
          (newEnd > existingStart && newEnd <= existingEnd) || // Novo registro termina no intervalo da reserva existente
          (newStart <= existingStart && newEnd >= existingEnd) || // Novo registro cobre toda a reserva existente
          newStart === existingStart || // Novo registro começa exatamente no início da reserva existente
          newEnd === existingEnd) // Novo registro termina exatamente no final da reserva existente
      ) {
        // Existe conflito
        return false;
      }
    }
  }

  // Se não houver conflitos, a reserva é válida
  return true;
};
