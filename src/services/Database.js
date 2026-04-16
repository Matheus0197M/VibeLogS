import storage from ’../utils/storage’;

 const DB_KEYS = {

 USERS: ’vibelog_users’, // Lista de usuarios cadastrados
 SESSION: ’vibelog_session’, // Usuario logado atual
 ENTRIES: ’vibelog_entries’, // Entradas/diarios dos usuarios
 };
const Database = {
 // ========== USUARIOS ==========

 async getAllUsers() {
 const users = await storage.getItem(DB_KEYS.USERS);
 return users || [];
 },

 async saveUser(user) {
 const users = await this.getAllUsers();
 const exists = users.find(u => u.email === user.email);

 if (exists) {
 return { success: false, error: ’Email ja cadastrado’ };
 }

 const newUser = {
 ...user,
 id: Date.now().toString(),
 createdAt: new Date().toISOString(),
 streak: 0,
 };

 users.push(newUser);
 await storage.setItem(DB_KEYS.USERS, users);
 return { success: true, user: newUser };
 },

 async validateLogin(email, password) {
 const user = await this.findUserByEmail(email);
 if (!user) {
 return { success: false, error: ’Usuario nao encontrado’ };
 }
 if (user.password !== password) {
 return { success: false, error: ’Senha incorreta’ };
 }
 return { success: true, user };
 },

 // ========== SESSAO ==========

 async getCurrentSession() {
 return await storage.getItem(DB_KEYS.SESSION);
 },

 async setSession(user) {
 await storage.setItem(DB_KEYS.SESSION, user);
 },

 async clearSession() {
 await storage.removeItem(DB_KEYS.SESSION);
 },

 // ========== ENTRADAS/DIARIO ==========

 async getUserEntries(userId) {
 const allEntries = await storage.getItem(DB_KEYS.ENTRIES);
 if (!allEntries) return [];
 return allEntries.filter(e => e.userId === userId);
 },

 async saveEntry(userId, entry) {
 const allEntries = await storage.getItem(DB_KEYS.ENTRIES) || [];

 const newEntry = {
 id: Date.now().toString(),
 userId,
 ...entry,
 createdAt: new Date().toISOString(),
 };

 allEntries.unshift(newEntry);
 await storage.setItem(DB_KEYS.ENTRIES, allEntries);
 await this.updateStreak(userId);

 return { success: true, entry: newEntry };
 },

 async updateStreak(userId) {
 const users = await this.getAllUsers();
 const userIndex = users.findIndex(u => u.id === userId);

 if (userIndex >= 0) {
 users[userIndex].streak = (users[userIndex].streak || 0) + 1;
 await storage.setItem(DB_KEYS.USERS, users);
 }
 },

 async clearAll() {
 await storage.removeItem(DB_KEYS.USERS);
 await storage.removeItem(DB_KEYS.SESSION);
await storage.removeItem(DB_KEYS.ENTRIES);
}
};
export default Database;