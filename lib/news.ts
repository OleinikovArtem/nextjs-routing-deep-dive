import sql from 'better-sqlite3'
import { NewsItem } from '@/types'

const db = sql('data.db')

export async function getAllNews(): Promise<NewsItem[]> {
  const news = db.prepare('SELECT * FROM news').all() as NewsItem[]
  await new Promise(resolve => setTimeout(resolve, 2000))

  return news
}

export async function getNewsItem(slug: string): Promise<NewsItem | undefined> {
  const newsItem = db.prepare('SELECT * FROM news WHERE slug = ?').get(slug) as NewsItem | undefined

  await new Promise((resolve) => setTimeout(resolve, 2000))

  return newsItem
}


export async function getLatestNews(): Promise<NewsItem[]> {
  const latestNews = db
    .prepare('SELECT * FROM news ORDER BY date DESC LIMIT 3')
    .all()
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return latestNews as NewsItem[]
}

export async function getAvailableNewsYears(): Promise<string[]> {
  const yearsData = db
    .prepare('SELECT DISTINCT strftime(\'%Y\', date) as year FROM news')
    .all() as { year: string }[]

  const years = yearsData.map((year) => year.year)

  await new Promise((resolve) => setTimeout(resolve, 2000))

  return years
}

export async function getAvailableNewsMonths(year: string): Promise<string[]> {
  const monthData = db
    .prepare(
      'SELECT DISTINCT strftime(\'%m\', date) as month FROM news WHERE strftime(\'%Y\', date) = ?',
    )
    .all(year) as { month: string }[]
  return monthData.map((month) => month.month)
}

export async function getNewsForYear(year: number | string): Promise<NewsItem[]> {
  const news = db
    .prepare(
      'SELECT * FROM news WHERE strftime(\'%Y\', date) = ? ORDER BY date DESC',
    )
    .all(year) as NewsItem[]

  await new Promise((resolve) => setTimeout(resolve, 2000))

  return news
}

export async function getNewsForYearAndMonth(year: number | string, month: number | string): Promise<NewsItem[]> {
  const news = db
    .prepare(
      'SELECT * FROM news WHERE strftime(\'%Y\', date) = ? AND strftime(\'%m\', date) = ? ORDER BY date DESC',
    )
    .all(year, month) as NewsItem[]

  await new Promise((resolve) => setTimeout(resolve, 2000))

  return news
}
