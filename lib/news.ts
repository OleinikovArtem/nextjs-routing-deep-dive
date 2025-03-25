import { DUMMY_NEWS } from '@/dummy-news'
import { NewsItem } from '@/types'

export function getAllNews(): NewsItem[] {
  return DUMMY_NEWS
}

export function getLatestNews(): NewsItem[] {
  return DUMMY_NEWS.slice(0, 3)
}

export function getAvailableNewsYears(): number[] {
  return DUMMY_NEWS.reduce<number[]>((years, news) => {
    const year = new Date(news.date).getFullYear()
    if (!years.includes(year)) {
      years.push(year)
    }
    return years
  }, []).sort((a, b) => b - a)
}

export function getAvailableNewsMonths(year: number): number[] {
  return DUMMY_NEWS.reduce<number[]>((months, news) => {
    const newsYear = new Date(news.date).getFullYear()
    if (newsYear === year) {
      const month = new Date(news.date).getMonth() + 1
      if (!months.includes(month)) {
        months.push(month)
      }
    }
    return months
  }, []).sort((a, b) => b - a)
}

export function getNewsForYear(year: number): NewsItem[] {
  return DUMMY_NEWS.filter((news) => new Date(news.date).getFullYear() === year)
}

export function getNewsForYearAndMonth(year: number, month: number): NewsItem[] {
  return DUMMY_NEWS.filter((news) => {
    const newsYear = new Date(news.date).getFullYear()
    const newsMonth = new Date(news.date).getMonth() + 1
    return newsYear === year && newsMonth === month
  })
}
