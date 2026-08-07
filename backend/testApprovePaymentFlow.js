require('dotenv').config({ override: true });

const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');
const PaymentService = require('./services/PaymentService');
const BusinessService = require('./services/BusinessService');

async function main() {
  console.log('Starting approval flow test...');
  await connectDB();

  const timestamp = Date.now();
  const userData = {
    codigo: `TESTUSER-${timestamp}`,
    nombre: 'Usuario de Prueba',
    correo: `testuser+${timestamp}@example.com`,
    celular: '3000000000',
    password: 'Test1234',
    rol: 'CLIENTE'
  };

  const user = new User(userData);
  await user.save();
  console.log('Test user created:', user._id.toString());

  const paymentData = {
    usuario: user._id,
    referencia: `TESTPAY-${timestamp}`,
    valor: 25000,
    metodoPago: 'NEQUI'
  };

  const pago = await PaymentService.crear(paymentData);
  console.log('Test payment created:', pago._id.toString());

  const admin = {
    id: user._id,
    rol: 'ADMIN'
  };

  const result = await BusinessService.aprobarPago(
    pago._id.toString(),
    admin,
    {
      ip: '127.0.0.1',
      headers: {
        'user-agent': 'test-script'
      }
    }
  );

  console.log('Approval flow result:');
  console.log(JSON.stringify(result, null, 2));

  console.log('Test completed successfully.');
  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error('Error during approval flow test:');
  console.error(error);
  if (mongoose.connection.readyState) {
    await mongoose.disconnect();
  }
  process.exit(1);
});
