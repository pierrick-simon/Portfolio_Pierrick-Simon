// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { formatPeriod, parsePeriod } from '@/lib/admin/period';
import { experiences } from '@/data/experiences';
import { formations } from '@/data/formations';
import { projects } from '@/data/projects';

describe('period text ↔ date pickers', () => {
  it('reads months, years, a single month and ongoing periods', () => {
    expect(parsePeriod('fév. 2026 - mars 2027')).toEqual({ start: '2026-02', end: '2027-03', yearsOnly: false, ongoing: false });
    expect(parsePeriod('2024 - 2029')).toEqual({ start: '2024', end: '2029', yearsOnly: true, ongoing: false });
    expect(parsePeriod('Mars 2025')).toEqual({ start: '2025-03', end: '2025-03', yearsOnly: false, ongoing: false });
    expect(parsePeriod("sept. 2025 - aujourd'hui")).toMatchObject({ start: '2025-09', ongoing: true });
    expect(parsePeriod('')).toMatchObject({ start: '', end: '' });
  });

  it('refuses text it cannot read', () => {
    expect(parsePeriod('été 2025')).toBeNull();
    expect(parsePeriod('2024 - mars 2025')).toBeNull();
  });

  it('writes the same style as the site', () => {
    expect(formatPeriod({ start: '2026-02', end: '2027-03' })).toBe('fév. 2026 - mars 2027');
    expect(formatPeriod({ start: '2025-03', end: '2025-03' })).toBe('mars 2025');
    expect(formatPeriod({ start: '2025-03', end: '' })).toBe('mars 2025');
    expect(formatPeriod({ start: '2024', end: '2029' })).toBe('2024 - 2029');
    expect(formatPeriod({ start: '2025-09', ongoing: true })).toBe("sep. 2025 - aujourd'hui");
    expect(formatPeriod({ start: '' })).toBe('');
  });

  it('understands every period already in the content', () => {
    const all = [...experiences, ...formations, ...projects].map((e) => e.period).filter(Boolean);
    for (const period of all) expect(parsePeriod(period), period).not.toBeNull();
  });
});
