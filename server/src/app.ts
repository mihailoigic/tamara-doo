import 'dotenv/config';
import app from './index';
import { dbCreateConnection } from './typeorm/dbCreateConnection';

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

(async () => {
    await dbCreateConnection();
})();