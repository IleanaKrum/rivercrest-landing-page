import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { courses } from "./drizzle/schema.ts";
import mysql from "mysql2/promise";

async function addSwahiliTranslations() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  const db = drizzle(connection);

  try {
    // Swahili translation for History & Polity course
    const swahiliHistoryPolity = `# Historia na Simu ya Kanisa la Kifaranga Huru

## Muhtasari wa Kozi
Kozi hii inaeleza historia ya Kanisa la Kifaranga Huru na kanuni zake za kuongoza. Inakusudiwa kwa wagombea wanaoongea Kiswahili wanaojiandaa kwa huduma ya Kanisa.

## Matokeo ya Kujifunza
Baada ya kukamilisha kozi hii, wanafunzi watakuwa na uwezo wa:
- Kueleza asili na historia ya Kanisa la Kifaranga Huru
- Kufahamu kanuni na muundo wa Kanisa
- Kuomba kanuni hizo kwa muktadha wa huduma yao
- Kukamatia waumini kuelekea imani ya Kifaranga Huru

## Moduli 1: Historia ya Kanisa la Kifaranga Huru
- Msingi wa Kanisa (B.T. Roberts na Ellen Roberts)
- Ukuaji wa Kanisa
- Ukuaji na Maendeleo

## Moduli 2: Simu ya Kanisa la Kifaranga Huru
- Muundo wa Kanisa
- Kanuni za Kanisa
- Ujumbe wa Kanisa

### Module 3: Articles of Religion - Core Beliefs of the Free Methodist Church
**Muhtasari wa Kozi:** Moduli hii inaanzisha viongozi wanaoongea Kiswahili kwa Makala ya Dini inayopatikana katika Kitabu cha Nidhamu cha 2019. Hizi ni "vitalu vya msingi" vya kile tunachoamini kama Wakristo wa Kifaranga Huru.

**Matokeo ya Kujifunza:**
- Kufahamu makala ya msingi ya Kanisa la Kifaranga Huru
- Kueleza msingi wa teolojia yetu
- Kuunganisha imani zetu kwa ujumbe na mazoezi

**Mada Zilizofunikwa:**
1. Mungu Ni Nani (Utatu wa Mungu) - Mungu Mmoja Halisi, Utatu wa Mungu, Yesu Kristo, Roho Mtakatifu
2. Mamlaka ya Biblia - Maandiko Matakatifu, Mwongozo Wetu
3. Okolezo na Neema - Tatizo la Dhambi, Neema ya Mungu, Kazi Nzuri
4. Safari ya Kikristo (Utakatifu) - Utakatifu Kamili, Kuishi Kwa Utakatifu
5. Utambulisho Wetu na Ujumbe - Kanisa, Haki na Huruma, Sakramenti

**Nyenzo za Lazima:**
- Kitabu cha Nidhamu cha 2019 (Sehemu ya Makala ya Dini)
- Mwongozo wa Kozi
- Muhtasari kwa Viongozi Wanaoongea Kiswahili

**Tathmini:**
- Maandishi ya Kufikiri
- Ombi la Maombi kuhusu Makala
- Mradi wa Mwisho unaounganisha Imani kwa Mazoezi

## Nyenzo za Kusoma

### Nyenzo za Msingi
1. Kitabu cha Nidhamu cha 2019
2. "B.T. and Ellen Roberts and the First Free Methodists"
3. "Fire Among the Stubble"
4. Kitabu cha Viongozi

### Nyenzo za Ziada
1. Biblia
2. Maandishi ya B.T. Roberts
3. Historia ya Kanisa

## Tathmini

### Sehemu ya Kwanza (Historia)
- Maswali ya Kujidhinisha: 20%
- Muhtasari wa Historia: 30%
- Ujumbe wa Kanisa: 20%

### Sehemu ya Pili (Simu)
- Maswali ya Kujidhinisha: 20%
- Muhtasari wa Simu: 30%
- Ujumbe wa Kanisa: 20%

### Mradi wa Mwisho
- Muhtasari wa Mwisho: 40%
- Ujumbe wa Kanisa: 30%
- Uandishi: 30%

**Kiwango cha Kupita:** 73%`;

    // Update the History & Polity courses with Swahili translations
    const result = await db
      .update(courses)
      .set({
        syllabusSwahili: swahiliHistoryPolity,
      })
      .where(eq(courses.title, "FMC History & Polity"));

    console.log("✓ Successfully added Swahili translations to History & Polity course!");
    console.log(`Updated ${result.rowsAffected} courses`);
  } catch (error) {
    console.error("Error adding Swahili translations:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

addSwahiliTranslations();
