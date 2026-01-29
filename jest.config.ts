import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
	dir: './',
})

const config: Config = {
	coverageProvider: 'v8',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
	},
	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
	collectCoverageFrom: [
		'app/**/*.{js,jsx,ts,tsx}',
		'shared/**/*.{js,jsx,ts,tsx}',
		'entities/**/*.{js,jsx,ts,tsx}',
		'features/**/*.{js,jsx,ts,tsx}',
		'widgets/**/*.{js,jsx,ts,tsx}',
		'!**/*.d.ts',
		'!**/node_modules/**',
		'!**/.next/**',
	],
}

export default createJestConfig(config)
