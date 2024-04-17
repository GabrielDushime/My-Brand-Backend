"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const messageRoutes_1 = __importDefault(require("./routes/messageRoutes"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const blogController_1 = require("./controllers/blogController");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const setupAdminCredentials_1 = require("./setupAdminCredentials");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Middleware
app.use(body_parser_1.default.urlencoded({ extended: true }));
mongoose_1.default.connect(process.env.database_connection);
const db = mongoose_1.default.connection;
db.once('open', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Connected to MongoDB');
    yield (0, setupAdminCredentials_1.addAdminCredentials)();
}));
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
// Serve Swagger UI
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
// Routes
app.use('/api/user', userRoutes_1.default);
app.options('/api/message');
app.use('/api/message', messageRoutes_1.default);
app.use('/api/blog', blogRoutes_1.default);
app.get('/api/comments', blogController_1.getAllComments);
app.get('/', (req, res) => {
    res.send('Welcome to my Brand Gabriel!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map