.phony: list of available make commands
help:
	@echo "Available commands:"
	@echo "  compile - Compile the project and prepare for GitHub page deployment"

.phony: compile everything and prepare for github page deployment
deploy:
	@echo "Compiling the project..."
	pnpm run build
	cp ~/stock-profit-calculation/dist/assets/*.js ~/stock-profit-calculation/docs/assets/*.js
	cp ~/stock-profit-calculation/dist/assets/*.css ~/stock-profit-calculation/docs/assets/*.css
	git add .
	git commit -m "Compliation done & deploying"
	git push
