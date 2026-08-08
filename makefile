.phony: list of available make commands
help:
	@echo "Available commands:"
	@echo "  compile - Compile the project and prepare for GitHub page deployment"

.phony: compile everything and prepare for github page deployment
compile:
	@echo "Compiling the project..."
	pnpm run build
	cp ~/stock-calculation/dist/assets/*.js ~/stock-calculation/docs/assets/*.js
	cp ~/stock-calculation/dist/assets/*.css ~/stock-calculation/docs/assets/*.css
	git add .
	git commit -m "Compliation done & ready for deploy"
